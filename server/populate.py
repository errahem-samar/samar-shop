import pandas as pd
from products.models import Product, Category

def create_categories():
    men_category, _ = Category.objects.get_or_create(name='men')
    women_category, _ = Category.objects.get_or_create(name='women')

    shoes_category, _ = Category.objects.get_or_create(name='shoes', parent=men_category)
    pants_category, _ = Category.objects.get_or_create(name='pants', parent=men_category)
    tshirts_category, _ = Category.objects.get_or_create(name='t-shirts', parent=men_category)
    accessories_category, _ = Category.objects.get_or_create(name='accessories', parent=men_category)

    shoes_category_women, _ = Category.objects.get_or_create(name='shoes', parent=women_category)
    pants_category_women, _ = Category.objects.get_or_create(name='pants', parent=women_category)
    tshirts_category_women, _ = Category.objects.get_or_create(name='t-shirts', parent=women_category)
    accessories_category_women, _ = Category.objects.get_or_create(name='accessories', parent=women_category)

    return {
        'shoes': {'Men': shoes_category, 'Women': shoes_category_women},
        'pants': {'Men': pants_category, 'Women': pants_category_women},
        't-shirts': {'Men': tshirts_category, 'Women': tshirts_category_women},
        'accessories': {'Men': accessories_category, 'Women': accessories_category_women},
    }

def load_products_from_csv():
    # Load the merged CSV file
    final_df = pd.read_csv('data.csv')

    # Create categories if they don't exist
    categories = create_categories()

    # Iterate through each row in the DataFrame
    for index, row in final_df.iterrows():
        product_id = row['id']
        name = row['name']
        description = row['description']
        price = row['price']
        category_name = row['category'].capitalize()  # Men/Women
        subcategory_name = row['subcategory']  # pants, t-shirts, shoes, accessories
        
        # Get the corresponding category
        category = categories[subcategory_name][category_name]

        # Create and save the Product instance
        product = Product(
            id=product_id,
            name=name,
            description=description,
            price=price,
            category=category,
            image=f'products/{product_id}.jpg'  # Path to the image
        )
        product.save()
        print(f"Added product: {name}")

# Call the function to load products
# load_products_from_csv()
