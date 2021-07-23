from .models import Booking,Availablility
from rest_framework import fields, serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken

class UserSerializerWithToken(serializers.ModelSerializer):
    token = serializers.SerializerMethodField(read_only=True)
    
    class Meta:
        model = User
        fields = ['id','username','email','is_staff','token']

    def get_token(self,obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)

class AvailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Availablility
        fields = '__all__'

class BookingSerializer(serializers.ModelSerializer):
    slot = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Booking
        fields = '__all__'

    def get_slot(self,obj):
        slot = obj.timeSlot 
        serializer = AvailSerializer(slot)

        return serializer.data




    
    
