from django.db import models
from mptt.models import MPTTModel, TreeForeignKey
from django.utils.translation import gettext_lazy as _
import os
from decimal import Decimal

def upload_to(instance, filename):
    name, extension = os.path.splitext(filename)
    extension = extension.lower()
    filename = f"{instance.pk}{extension}"
    return f'products/{filename}'    

def upload(instance, filename):
    name, extension = os.path.splitext(filename)
    extension = extension.lower()
    filename = f"{instance.pk}{extension}"
    return f'categories/{filename}'

class Category(MPTTModel):
    name = models.CharField(max_length=100)
    color = models.CharField(max_length=7, default= '#3498db')
    image = models.ImageField(_("image"), upload_to=upload, default='categories/default.jpg')
    parent = TreeForeignKey("self", on_delete=models.PROTECT, null=True, blank=True)

    def save(self, *args, **kwargs):
        if not self.pk:
            saved_image = self.image 
            self.image = None  
            super().save(*args, **kwargs)
            self.image = saved_image
        else:
            old_instance = Category.objects.get(pk=self.pk)
            old_image = old_instance.image
            old_image_path = old_image.path
            if old_image and old_image.name != 'categories/default.jpg':
                if os.path.isfile(old_image_path):
                    os.remove(old_image_path)
            _, extension = os.path.splitext(self.image.name)
            new_filename = f'categories/{self.pk}{extension}'
            new_image_path = os.path.join(self.image.storage.location, new_filename)
            self.image.name = new_filename
        
        super().save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        if self.image and self.image.name != 'categories/default.jpg':
            if os.path.isfile(self.image.path):
                os.remove(self.image.path)
        super().delete(*args, **kwargs)
    
    class MPTTMeta:
        order_insertion_by = ['name']
    
    def __str__(self):
        return self.name

class Product(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    # image_path = models.TextField(default="no_image.jpg")
    image = models.ImageField(_("image"), upload_to=upload_to, default='products/default.jpg')
    price = models.DecimalField(_("price"), max_digits=6, decimal_places=3, default=Decimal('0.00'))
    # price = models.IntegerField()
    category = TreeForeignKey('Category', null=True, blank=True, on_delete=models.SET_NULL)

    def save(self, *args, **kwargs):
        if not self.pk:
            saved_image = self.image 
            self.image = None  
            super().save(*args, **kwargs)
            self.image = saved_image
        else:
            try:
                old_instance = Product.objects.get(pk=self.pk)
                old_image = old_instance.image
                old_image_path = old_image.path
                if old_image and old_image.name != 'products/default.jpg':
                    if os.path.isfile(old_image_path):
                        os.remove(old_image_path)
                _, extension = os.path.splitext(self.image.name)
                new_filename = f'products/{self.pk}{extension}'
                new_image_path = os.path.join(self.image.storage.location, new_filename)
                self.image.name = new_filename
            except:
                pass
        
        super().save(*args, **kwargs)
                
    def delete(self, *args, **kwargs):
        if self.image and self.image.name != 'products/default.jpg':
            if os.path.isfile(self.image.path):
                os.remove(self.image.path)
        super().delete(*args, **kwargs)

    def __str__(self):
        return self.name
