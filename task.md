# wordflow

1.  define schema
2.  define service
3.  define controller
4.  define router
5.  sign in router

# rule of project

-   handle final reponse json in controller
-   middleware of moogose to handle fidle of document
-   middleware in controller to handle relation

# task

-   Schema:

    -   category: Done
    -   Brand: Done
    -   Product: (pendding relative product)
    -   Product Detail: on task
        -   add promotion for product detail
        -   add promotion for option
    -   Review: Done
    -   Promotion:
        -   when delete remove form option and promtion of product: Done

-   check relation
-   login
-   add sesstion to store cart
-   add mailer when user checkout
-   add socket when user comment

# note

1. middel ware in mongoose

-   với method pre, chỉ hỗ trợ các sự kiện save,... không hỗ trợ findOneAndUpdate
