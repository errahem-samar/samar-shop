from django.contrib import admin

from .models import Category, Product, ProductLine

admin.site.register(Product)
admin.site.register(Category)
admin.site.register(ProductLine)