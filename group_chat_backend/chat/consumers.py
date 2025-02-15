import json
from channels.generic.websocket import AsyncWebsocketConsumer
from datetime import datetime

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.channel_layer.group_add("chat_group", self.channel_name)
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard("chat_group", self.channel_name)

    async def receive(self, text_data):
        data = json.loads(text_data)
        message = data["message"]
        sender = data["sender"]
        timestamp = datetime.now().strftime("%I:%M %p")

        # Send message to the group
        await self.channel_layer.group_send(
            "chat_group",
            {
                "type": "chat_message",
                "message": message,
                "sender": sender,
                "timestamp": timestamp,
            },
        )

    async def chat_message(self, event):
        await self.send(text_data=json.dumps(event))
