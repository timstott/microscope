# Microscope - Discover Meteor

# Notes to self

## Folder structure
* Code in the /server directory only runs on the server.
* Code in the /client directory only runs on the client.
* Everything else runs on both the client and server.
* Files in /lib are loaded before anything else.
* Any main.* file is loaded after everything else. Your static assets (fonts, images, etc.) go in the /public directory.

## Find & Fetch

In Meteor, find() returns a cursor, which is a reactive data source. When we
want to log its contents, we can then use fetch() on that cursor to transform it
into an array .

Within an app, Meteor is smart enough to know how to iterate over cursors
without having to explicitly convert them into arrays first. This is why you
won't see fetch() that often in actual Meteor code (and why we didn't use it in
the above example).
