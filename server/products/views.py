from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from .models import Product, Category
from .serializers import ProductSerializer, CategorySerializer

class  CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all().order_by('id')

    def list(self, request):
        serializer = CategorySerializer(self.queryset, many=True)
        return Response(serializer.data)

class  ProductViewSet(viewsets.ModelViewSet):
    # queryset = Product.objects.all().order_by('id')
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    def list(self, request):
        serializer = ProductSerializer(self.queryset, many=True)
        return Response(serializer.data)