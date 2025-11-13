from rest_framework import viewsets
from .models import UserProfile, Room, CleaningChecklist, Maintenance, InventoryItem
from .serializers import UserProfileSerializer, RoomSerializer, CleaningChecklistSerializer, MaintenanceSerializer, InventoryItemSerializer

class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer

class RoomViewSet(viewsets.ModelViewSet):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer

class CleaningChecklistViewSet(viewsets.ModelViewSet):
    queryset = CleaningChecklist.objects.all()
    serializer_class = CleaningChecklistSerializer

class MaintenanceViewSet(viewsets.ModelViewSet):
    queryset = Maintenance.objects.all()
    serializer_class = MaintenanceSerializer

class InventoryItemViewSet(viewsets.ModelViewSet):
    queryset = InventoryItem.objects.all()
    serializer_class = InventoryItemSerializer
