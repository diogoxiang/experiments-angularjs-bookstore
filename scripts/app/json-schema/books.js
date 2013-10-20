define({
    "type":"array",
    "$schema": "http://json-schema.org/draft-03/schema",
    "title": "books",
    "minitems": "0",
    "id": "http://jsonschema.net",
    "required":true,
    "properties":{
        "0": {
            "type":"object",
            "title": "book",
            "id": "http://jsonschema.net/0",
            "required":false,
            "properties":{
                "author": {
                    "type":"string",
                    "id": "http://jsonschema.net/0/author",
                    "required":true
                },
                "category": {
                    "type":"string",
                    "id": "http://jsonschema.net/0/category",
                    "required":true
                },
                "description": {
                    "type":"string",
                    "id": "http://jsonschema.net/0/description",
                    "required":true
                },
                "id": {
                    "type":"string",
                    "id": "http://jsonschema.net/0/id",
                    "required":true
                },
                "image": {
                    "type":"string",
                    "id": "http://jsonschema.net/0/image",
                    "required":true
                },
                "price": {
                    "type":"number",
                    "minimum": "0",
                    "id": "http://jsonschema.net/0/price",
                    "required":true
                },
                "quantity": {
                    "type":"number",
                    "minimum": "0",
                    "id": "http://jsonschema.net/0/quantity",
                    "required":true
                },
                "title": {
                    "type":"string",
                    "id": "http://jsonschema.net/0/title",
                    "required":true
                }
            }
        }
    }
});