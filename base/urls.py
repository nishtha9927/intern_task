from django.contrib import admin
from django.urls import path,include
from . import views

urlpatterns = [
    path('login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('avail/', views.getAvail, name='availability'),
    path('bookings/', views.getBookings, name='Bookings'),
    path('break/', views.Break, name='Break'),
    path('bookApt/', views.createBooking, name='create-Booking'),
]