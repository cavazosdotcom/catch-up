AS A USER

I WANT to create a list of show/books/movies/etc...

SO THAT I CAN catch up on shows etc...


MODELS

    USER (has one LIST)
    - id
    - name
    - email
    - password

    LIST (Belongs to USER, has many MEDIA)
    - id
    - user_id (ref. USER id)
    - media (array of media IDs, each ref. MEDIA id)

    MEDIA
    - id
    - title
    - type (String, "movie", "tv series", "book", etc.)
    - info (Stringified JSON, eg. `{author: somebody, pages: n, etc...}`)


    FUTURE DEV.
        flag when shows air, movies release with time based js 
        random selector