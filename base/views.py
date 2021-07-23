from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAdminUser,IsAuthenticated
from django.contrib.auth.models import User
from rest_framework.response import Response
from .models import Booking,Availablility
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import AvailSerializer, BookingSerializer, UserSerializerWithToken

# Create your views here.
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        serializer = UserSerializerWithToken(self.user).data

        for k,v in serializer.items():
            data[k] = v

        return data

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@permission_classes([IsAuthenticated])
@api_view(['GET'])
def getAvail(request):
    slots = Availablility.objects.all().exclude(status="Break")
    serializer = AvailSerializer(slots,many=True)
    return Response(serializer.data)

@permission_classes([IsAdminUser])
@api_view(['GET'])
def getBookings(request):
    booked = Booking.objects.all().order_by('timeSlot__id')
    serializer = BookingSerializer(booked,many=True)
    return Response(serializer.data)

@permission_classes([IsAdminUser])
@api_view(['GET'])
def Break(request):
    slots = Availablility.objects.filter(status="Break")
    serializer = AvailSerializer(slots,many=True)
    return Response(serializer.data)



@permission_classes([IsAuthenticated])
@api_view(['POST'])
def createBooking(request):
    user = request.user
    data = request.data
    timeSlot = Availablility.objects.get(slots = data['slot'])
    booking = Booking.objects.create(
        user = user,
        patientName = data['name'],
        timeSlot = timeSlot


    )
    timeSlot.status = "Booked"
    timeSlot.save()
    serializer = BookingSerializer(booking,many=False)
    return Response(serializer.data)
