# NestJS - PSQL - ReactJS Cafe Application
#### Promotional Video
[play](https://www.linkedin.com/posts/sezerkenar_reactjs-nestjs-typeorm-activity-6934239259520299008-Yocj?utm_source=linkedin_share&utm_medium=member_desktop_web)


## How To Execute the App locally
### **Backend**
___
- Download postgresql on computer.
- Change the features of database from backend/.env file.
- .env dosyasında 'DB_NAME' değerine verdiğiniz isim adında pgAdminden manuel olarak veritabanı oluşturunuz.
- If nestjs not exist in computer, run `npm i -g @nestjs/cli`
- To execute project locally `(localhost:8080)` run `npm start`

### **Frontend**
___
- To execute project locally `(localhost:3000)` run `npm start`

#### Database Tables
___
##### masa
---
| id           | kisiSayisi  | masaAdi     | dolu        | siparisId   | adisyonId   |
| -----------  | ----------- | ----------- | ----------- | ----------- | ----------- |
| integer      | integer     | varchar     | integer     | uuid (FK)   | uuid (FK)   |

##### category
---
| id           | name        |
| -----------  | ----------- |
| uuid         | varchar     |

##### product
---
| id           | name        | price       | description | imgUrl      | updatedAt   | categoryId | 
| -----------  | ----------- | ----------- | ----------- | ----------- | ----------- | ----------- |
| uuid         | varchar     | integer     | varchar     | varchar     | timestamp   | uuid (FK) |

##### siparis
---
| id           | urunler     |
| -----------  | ----------- |
| uuid         | text        |
##### adisyon
---
| id           | ucret       | aktif       | tarih       | masaAdi     | urunler     |
| -----------  | ----------- | ----------- | ----------- | ----------- | ----------- |
| uuid         | integer     | integer     | date        | varchar     | text        |

#### User Types
> Admin
> Şef
> Personel

#### Distribution of Authority
___
| Kullanıcı Bölümü   | Masa        | Ürün        | Sipariş     | Adisyon     |   
| -----------        | ----------- | ----------- | ----------- | ----------- |
| Admin              | C-R-U-D     | C-R-U-D     |  -          | R           |
| Personel           | R-U         | R           | C-R-U-D     | C-R         |
| Mutfak             | R           | R           | R-U         | U           |

# /home
![Home Page](/home.png "Home Page")

