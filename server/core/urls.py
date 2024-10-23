from django.contrib import admin
from django.urls import path, include
# from rest_framework.routers import DefaultRouter
# from products import views 
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path("api/", include('products.urls', namespace='products')),
    path("model-api/", include('similarity.urls', namespace='similarity'))
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)