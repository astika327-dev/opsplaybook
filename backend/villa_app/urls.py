from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserProfileViewSet, RoomViewSet, CleaningChecklistViewSet, MaintenanceViewSet, InventoryItemViewSet

router = DefaultRouter()
router.register(r'userprofiles', UserProfileViewSet)
router.register(r'rooms', RoomViewSet)
router.register(r'cleaning-checklists', CleaningChecklistViewSet)
router.register(r'maintenance', MaintenanceViewSet)
router.register(r'inventory-items', InventoryItemViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
