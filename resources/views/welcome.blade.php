<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Laravel</title>

        <style>
            body {
                font-family: 'Nunito', sans-serif;
            }
        </style>
        <script defer src="{{ asset('js/manifest.js') }}"></script>
        <script defer src="{{ asset('js/vendor.js') }}"></script>
        <script defer src="{{ asset('js/app.js') }}"></script>
    </head>
    <body>
        <div id="example"></div>
    </body>
</html>
