from django.shortcuts import render, get_object_or_404
from rest_framework import viewsets, generics
from rest_framework.response import Response
from .models import Product, Category
from .serializers import ProductSerializer, CategorySerializer

class  CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all().order_by('id')
    serializer_class = CategorySerializer

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

class CategoryProductsAPIView(generics.ListAPIView):
    serializer_class = ProductSerializer

    def get_queryset(self):
        category = get_object_or_404(Category, id=self.kwargs['category_id'])
        # descendant_categories = category.get_descendants(include_self=True)
        # return Product.objects.filter(category__in=descendant_categories)
        products = Product.objects.filter(category=category)
        return products