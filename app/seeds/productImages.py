from app.models import db, ProductImage, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_product_images():
   pic1 = ProductImage(
      productId = 1, image_url="https://m.media-amazon.com/images/I/81i4Qoc43PS.jpg")
   pic2= ProductImage(
      productId = 1, image_url="https://rainbowplantlife.com/wp-content/uploads/2022/09/Mexican-Black-Beans-cover-photo-1-of-1-500x500.jpg")
   pic3 = ProductImage(
      productId = 1, image_url="https://www.daringgourmet.com/wp-content/uploads/2020/08/Baked-Beans-20.jpg")
   pic4 = ProductImage(
      productId = 1, image_url="https://cdn.loveandlemons.com/wp-content/uploads/2021/02/black-bean-recipes.jpg")
   pic5= ProductImage(
      productId = 1, image_url="https://belleofthekitchen.com/wp-content/uploads/2018/06/mexican-black-beans-square.jpg")
   pic6 = ProductImage(
      productId = 2, image_url="https://www.avidacbd.com/wp-content/uploads/2023/06/500_Blue_Razz_cbd_vape.jpg")
   pic7 = ProductImage(
      productId = 2, image_url = "https://www.redstarvapor.com/wp-content/uploads/2023/10/GeekBar-Pulse.jpg")
   pic8 = ProductImage(
      productId = 2, image_url="https://eliquidstop.com/cdn/shop/files/smok-priv-bar-turbo-15000-puffs-vape-disposable-anti-leak-tech-eliquidstop-3_700x700.jpg?v=1704943825")
   pic9 = ProductImage(
      productId = 2, image_url="https://infiniterecovery1.b-cdn.net/wp-content/uploads/2023/01/from-squarespace-14754-AdobeStock_113130199.jpeg")
   pic10 = ProductImage(
      productId = 2, image_url="https://www.huffandpuffers.com/cdn/shop/files/raz-tn9000-disposable-vape-pineapple-passionfruit-guava.jpg?v=1711046083&width=1000")
   pic11 = ProductImage(
      productId = 3, image_url="https://hips.hearstapps.com/hmg-prod/images/2024-tesla-cybertruck-115-65e8945de87ba.jpg")
   pic12 = ProductImage(
      productId = 3, image_url="https://www.greendrive-accessories.com/blog/wp-content/uploads/2024/01/Tesla-Cybertruck-Towing-Prowess-and-Range-Revelations.png")
   pic13 = ProductImage(
      productId = 3, image_url="https://images.hindustantimes.com/auto/img/2023/12/01/600x338/Tesla_Cybertruck_4_1701399142651_1701400983502.jpg")
   pic14 = ProductImage(
      productId = 3, image_url="https://www.ttnews.com/sites/default/files/styles/convert_to_webp/public/2024-02/Cybertruck-Interior-650.jpg.webp")
   pic15 = ProductImage(
      productId = 3, image_url="https://picolio.auto123.com/auto123-media/articles/2023/11/70954/tesla-cybertruck-xiaohongshu-weibo-002fr.jpg?scaledown=450")
   pic16 = ProductImage(
      productId = 4, image_url="https://m.media-amazon.com/images/I/61JwUs88jzS.jpg")
   pic17 = ProductImage(
      productId = 4, image_url="https://now.estarland.com/images/products/67/61367/MERCH-Pokemon-Pikachu-Happy-Big-Face-Pre-Curved-Snapback-Hat-large-image.jpg")
   pic18 = ProductImage(
      productId = 4, image_url="https://img.vuitino.com/soc/280624Vui-290624/pikachu-luffy-one-piece-pokemon/pikachu-luffy-one-piece-pokemon-1.jpg")
   pic19 = ProductImage(
      productId = 5, image_url="https://i.ebayimg.com/00/s/MTIwMFgxNjAw/z/ImQAAOSwJU9lYkPc/$_57.JPG?set_id=8800005007")
   pic20 = ProductImage(
      productId = 6, image_url="https://m.media-amazon.com/images/I/71FobkNjTZL.jpg")
   pic21 = ProductImage(
      productId = 6, image_url="https://m.media-amazon.com/images/I/71ttaYC3mgL.jpg")
   pic22 = ProductImage(
      productId = 6, image_url="https://rvb-img.reverb.com/image/upload/s--plXGHR_R--/a_0/f_auto,t_large/v1694001961/argvgzspylamqhfucbn4.jpg")
   pic23 = ProductImage(
      productId = 6, image_url="https://m.media-amazon.com/images/I/617mv121fBL._AC_UF894,1000_QL80_.jpg")
   pic24 = ProductImage(
      productId = 6, image_url="https://www.pianogallery.com/wp-content/uploads/2017/05/CVP701B.jpg")
   pic25 = ProductImage(
      productId = 6, image_url="https://rvb-img.reverb.com/image/upload/s--tQfOMr81--/a_0/f_auto,t_large/v1701779658/lzhlescsmpjns8h2b03p.jpg")
   pic26 = ProductImage(
      productId = 6, image_url="https://kawaius.com/wp-content/uploads/photo-gallery/imported_from_media_libray/thumb/CS11-Polished-Ebony.jpg?bwg=1698338789")
   pic27 = ProductImage(
      productId = 6, image_url="https://cdn.thewirecutter.com/wp-content/media/2021/08/budget-digital-piano-2048px-0588.jpg")
   pic28 = ProductImage(
      productId = 8, image_url="https://www.paintingforhome.com/cdn/shop/products/1_3341af1a-f5d9-4168-864c-f57165eade4a_1200x1200.jpg?v=1658006559")
   pic29 = ProductImage(
      productId = 8, image_url="https://i.etsystatic.com/11488778/r/il/3626e5/4771916170/il_570xN.4771916170_a9o1.jpg")
   pic30 = ProductImage(
      productId = 8, image_url="https://m.media-amazon.com/images/I/61VjIRf-bRL._AC_UF894,1000_QL80_.jpg")
   pic31 = ProductImage(
      productId = 9, image_url="https://cbpetz.com/media/catalog/product/cache/1fe51b583c30870e529a86e66e6132cd/d/p/dpcl-tpf---deluxe-tropical-floral-dog-collar-and-leash_-_image_1.jpg")
   pic32 = ProductImage(
      productId = 9, image_url="https://www.saltypawscollars.com/cdn/shop/products/dog-collar-leash-matching-set-hawaiian-tropical-black-floral_2000x.jpg?v=1677515913")
   pic33 = ProductImage(
      productId = 9, image_url="https://www.madebycleo.com/cdn/shop/files/il_fullxfull.6073640038_59fl_800x.jpg?v=1719022480")
   pic34 = ProductImage(
      productId = 9, image_url="https://www.madebycleo.com/cdn/shop/files/il_fullxfull.6074717246_t4nv_800x.jpg?v=1719022496")
   pic35 = ProductImage(
      productId = 9, image_url="https://tropicalcontento.com/cdn/shop/files/sodatabs_7acc2cc4-b373-442e-8f4f-2d03cfbc332c.jpg?v=1696899211&width=2080")
   pic36 = ProductImage(
      productId = 10, image_url="https://i.pinimg.com/564x/1b/24/38/1b2438edbd16f482df2824c25d3a3391.jpg")
   pic37 = ProductImage(
      productId = 10, image_url="https://i.etsystatic.com/25548244/r/il/7f4f9c/4947423547/il_300x300.4947423547_odd7.jpg")
   pic38 = ProductImage(
      productId = 10, image_url="https://savortheflavour.com/wp-content/uploads/2022/03/Cuban-Coffee-Tasty.jpg")
   pic39 = ProductImage(
      productId = 10, image_url="https://i.ebayimg.com/images/g/1gkAAOSwWhVhdFDn/s-l1200.jpg")
   pic40 = ProductImage(
      productId = 10, image_url="https://assets.epicurious.com/photos/57bb33d406de447f4e6d9343/master/pass/cuban-coffee-em-cafecito-em.jpg")
   pic41 = ProductImage(
      productId = 7, image_url="https://www.cnet.com/a/img/resize/ef6793231464c98cdb3e5e9ffb780405eb2a8427/hub/2021/10/23/80425069-0d3e-4c67-9085-a66e6177fc60/macbook-pro-2021-cnet-review-12.jpg?auto=webp&fit=crop&height=362&width=644")

   db.session.add(pic1)
   db.session.add(pic2)
   db.session.add(pic3)
   db.session.add(pic4)
   db.session.add(pic5)
   db.session.add(pic6)
   db.session.add(pic7)
   db.session.add(pic8)
   db.session.add(pic9)
   db.session.add(pic10)
   db.session.add(pic11)
   db.session.add(pic12)
   db.session.add(pic13)
   db.session.add(pic14)
   db.session.add(pic15)
   db.session.add(pic16)
   db.session.add(pic17)
   db.session.add(pic18)
   db.session.add(pic19)
   db.session.add(pic20)
   db.session.add(pic21)
   db.session.add(pic22)
   db.session.add(pic23)
   db.session.add(pic24)
   db.session.add(pic25)
   db.session.add(pic26)
   db.session.add(pic27)
   db.session.add(pic28)
   db.session.add(pic29)
   db.session.add(pic30)
   db.session.add(pic31)
   db.session.add(pic32)
   db.session.add(pic33)
   db.session.add(pic34)
   db.session.add(pic35)
   db.session.add(pic36)
   db.session.add(pic37)
   db.session.add(pic38)
   db.session.add(pic39)
   db.session.add(pic40)
   db.session.add(pic41)
   db.session.commit()

def undo_product_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.productimages RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM productimages"))
    db.session.commit()