define({ api: [
  {
    "type": "",
    "url": "{}",
    "title": "Authentication",
    "name": "Authenticate",
    "group": "API",
    "version": "0.0.0",
    "filename": "sources/API.js"
  },
  {
    "type": "",
    "url": "{}",
    "title": "Header parameters",
    "name": "HeaderParams",
    "group": "API",
    "description": "<p>The header of all your request to the API has to / may include some useful parameters.</p>",
    "success": {
      "examples": [
        {
          "title": "Use example",
          "content": "Request Header:\n---------------\nGET /api/events HTTP/1.1\nHost: localhost:1337\nAccept-Language: fr-FR\n...\n"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "field": "Accept-Language",
            "defaultValue": "Locale du navigateur",
            "optional": true,
            "description": "<p>Langue de retour demandée. Exemple : fr-FR.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "sources/API.js"
  },
  {
    "type": "",
    "url": "{}",
    "title": "Errors codes",
    "name": "ErroCode",
    "group": "Errors",
    "description": "<p>redh00d use many way to tell whether an error occurs and what was the error. The most reliable and trustable way is the error code. Errors codes are fixed and you can only manage with them to treat errors on customer side. Just read the code and display the messages you want.</p>",
    "header": {
      "fields": {
        "Codes detailed.": [
          {
            "group": "Errors",
            "type": "String",
            "field": "code",
            "optional": false,
            "description": ""
          },
          {
            "group": "Errors",
            "type": "String",
            "field": "code.resourceNotFound",
            "optional": false,
            "description": "<p>La ressource recherchée n&#39;a pas été trouvée.</p>"
          },
          {
            "group": "Errors",
            "type": "String",
            "field": "code.modelNotFound",
            "optional": false,
            "description": "<p>Le model / classe recherché(e) n&#39;a pas été trouvé(e).</p>"
          },
          {
            "group": "Errors",
            "type": "String",
            "field": "code.pageNotFound",
            "optional": false,
            "description": "<p>La page demandée n&#39;a pas été trouvée.</p>"
          },
          {
            "group": "Errors",
            "type": "String",
            "field": "code.dbUnavailable",
            "optional": false,
            "description": "<p>.</p>"
          },
          {
            "group": "Errors",
            "type": "String",
            "field": "code.noAccessRights",
            "optional": false,
            "description": "<p>.</p>"
          },
          {
            "group": "Errors",
            "type": "String",
            "field": "code.emailArleadyTaken",
            "optional": false,
            "description": "<p>.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "sources/Error.js"
  },
  {
    "type": "",
    "url": "{}",
    "title": "Errors responses",
    "name": "ErrorResponse",
    "group": "Errors",
    "description": "<p>redh00d uses conventional HTTP response codes to indicate success or failure of an API request.<br/>In general, codes in the 2xx range indicate success, codes in the 4xx range indicate an error<br/>that resulted from the provided information (e.g. a required parameter was missing, a charge failed, etc.), and<br/>codes in the 5xx range indicate an error with redh00d servers.</p><p><br/><b>HTTP Status Code Summary:</b><br/>200 OK - Everything worked as expected.<br/>400 Bad Request - Often missing a required parameter.<br/>401 Unauthorized - No valid API key provided.<br/>402 Request Failed - Parameters were valid but request failed.<br/>404 Not Found - The requested item doesn&#39;t exist.<br/>500, 502, 503, 504 Server errors - something went wrong on redh00d&#39;s end.</p>",
    "error": {
      "fields": {
        "Response attributes": [
          {
            "group": "errorResponse",
            "type": "String",
            "field": "message",
            "optional": false,
            "description": "<p>Error message.</p>"
          },
          {
            "group": "errorResponse",
            "type": "String",
            "field": "description",
            "optional": true,
            "description": "<p>More detailed error message.</p>"
          },
          {
            "group": "errorResponse",
            "type": "String",
            "field": "code",
            "optional": false,
            "description": "<p>Error code (Check the section above).</p>"
          },
          {
            "group": "errorResponse",
            "type": "String",
            "field": "status",
            "optional": false,
            "description": "<p>400, 401, 500, ...</p>"
          },
          {
            "group": "errorResponse",
            "type": "Object[]",
            "field": "params",
            "optional": true,
            "description": "<p>The parameters the error relates to if the error is parameter-specific.</p>"
          },
          {
            "group": "errorResponse",
            "type": "Object[]",
            "field": "params.field",
            "optional": false,
            "description": "<p>The field name relatives to error.</p>"
          },
          {
            "group": "errorResponse",
            "type": "Object[]",
            "field": "params.code",
            "optional": false,
            "description": "<p>The code error.</p>"
          },
          {
            "group": "errorResponse",
            "type": "Object[]",
            "field": "params.message",
            "optional": false,
            "description": "<p>.</p>"
          },
          {
            "group": "errorResponse",
            "type": "Object[]",
            "field": "params.description",
            "optional": true,
            "description": "<p>.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error (400 Bad request) response sample (case of parameters validation failed):",
          "content": "   HTTP/1.1 400 BAD REQUEST\n   {\n     \"message\": \"The requested parameters are not correct\",\n     \"code\": \"invalidParams\"\n     \"params\": [\n        {\n          \"message\": \"This field should contain at least 4 characters\",\n          \"code\": \"fieldTooShort\"\n          \"field\": \"foo\"\n        },\n        ...\n     ],\n     \"status\": \"400\"\n   }\n"
        },
        {
          "title": "Error (400 Bad request) response sample (email taken case):",
          "content": "   HTTP/1.1 400 BAD REQUEST\n   {\n     \"message\": \"This email was already taken\",\n     \"code\": \"emailArleadyTaken\",\n     \"status\": \"400\"\n   }\n"
        },
        {
          "title": "Error (404 Not Found) response sample:",
          "content": "   HTTP/1.1 404 Not Found\n   {\n     \"message\": \"This user doesn't exist\",\n     \"code\": \"modelNotFound\"\n     \"status\": \"404\"\n   }\n"
        },
        {
          "title": "Error (403 Forbidden Error) response sample:",
          "content": "   HTTP/1.1 403 Forbidden Error\n   {\n     \"message\": \"You do not have enough rights to access this resource\",\n     \"code\": \"noAccessRights\"\n     \"status\": \"403\"\n   }\n"
        },
        {
          "title": "Error (500 Serveur Error) response sample:",
          "content": "   HTTP/1.1 500 Serveur Error\n   {\n     \"message\": \"Database unavailable\",\n     \"code\": \"dbUnavailable\"\n     \"status\": \"500\"\n   }\n"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "sources/Error.js"
  },
  {
    "parameter": {
      "fields": {
        "Parameters (URL)": [
          {
            "group": "urlParam",
            "type": "Number",
            "field": "id",
            "optional": true,
            "description": "<p>Use it to retrieve only one event with its ID.</p>"
          },
          {
            "group": "urlParam",
            "type": "String",
            "field": "eventName",
            "optional": true,
            "description": ""
          },
          {
            "group": "urlParam",
            "type": "String",
            "field": "eventDate",
            "optional": true,
            "description": ""
          },
          {
            "group": "urlParam",
            "type": "String",
            "field": "eventPlace",
            "optional": true,
            "description": ""
          },
          {
            "group": "urlParam",
            "type": "String",
            "field": "sort",
            "optional": true,
            "description": "<p>get the result sorted</p>"
          }
        ]
      }
    },
    "group": "Event.js",
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "sources/Event.js"
  },
  {
    "type": "post",
    "url": "/events",
    "title": "Create an event",
    "name": "CreateEvent",
    "group": "Events",
    "permission": {
      "name": "authenticated",
      "title": "Authentication requiered",
      "description": ""
    },
    "description": "<p>Create an event which is retrieve if creation was a success.<br/><b>Throw error:</b> 400.</p>",
    "parameter": {
      "fields": {
        "dataData": [
          {
            "group": "dataData",
            "type": "String",
            "field": "name",
            "optional": false,
            "description": ""
          },
          {
            "group": "dataData",
            "type": "String",
            "field": "description",
            "optional": true,
            "description": ""
          },
          {
            "group": "dataData",
            "type": "String",
            "field": "place",
            "optional": true,
            "description": ""
          },
          {
            "group": "dataData",
            "type": "String",
            "field": "date",
            "optional": false,
            "description": ""
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Use example",
        "content": "post http://localhost/events\nform-data: name=MyEvent&date=2014-12-24\n"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Error (400 Bad request) response sample (case of parameters validation failed):",
          "content": "   HTTP/1.1 400 BAD REQUEST\n   {\n     \"message\": \"The requested parameters are not correct\",\n     \"code\": \"invalidParams\"\n     \"params\": [\n        {\n          \"message\": \"This field should contain at least 4 characters\",\n          \"code\": \"fieldTooShort\"\n          \"field\": \"foo\"\n        },\n        ...\n     ],\n     \"status\": \"400\"\n   }\n"
        }
      ]
    },
    "success": {
      "fields": {
        "Success (201 CREATED) response parameters": [
          {
            "group": "201",
            "type": "Object",
            "field": "object",
            "optional": false,
            "description": "<p>The created object.</p>"
          },
          {
            "group": "201",
            "type": "String",
            "field": "status",
            "optional": false,
            "description": "<p>201.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success (201 CREATED) response sample:",
          "content": "HTTP/1.1 201 CREATED\n{\n   \"object\": {\n       \"field1\": \"Foo\",\n       \"field2\": \"Bar\",\n       ...\n   },\n   \"status\": 201\n}\n"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "sources/Event.js"
  },
  {
    "type": "delete",
    "url": "/events/:id",
    "title": "Delete an Event",
    "name": "DeleteEvent",
    "group": "Events",
    "permission": "authenticated eventOwner",
    "description": "<p>Delete an event<br/><b>Throw error:</b> 404.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "field": "id",
            "optional": false,
            "description": "<p>Event&#39;s ID</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Use example",
        "content": "delete http://localhost/events/15\n"
      }
    ],
    "success": {
      "fields": {
        "Success (204 NO CONTENT) response parameters": [
          {
            "group": "204",
            "type": "String",
            "field": "status",
            "optional": false,
            "description": "<p>204.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success (204 NO CONTENT) response sample:",
          "content": "HTTP/1.1 204 NO CONTENT\n{\n   \"status\": 204\n}\n"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "sources/Event.js"
  },
  {
    "type": "get",
    "url": "/events/:id",
    "title": "Search for an Event by its ID",
    "name": "FindEvent",
    "group": "Events",
    "groupDescription": "<p>API corresponding to Event</p>",
    "description": "<p>Find an event by its ID<br/><b>Throw error:</b> 404</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "field": "id",
            "optional": false,
            "description": "<p>Event unique ID.</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Use example",
        "content": "get http://localhost/events/15\n"
      }
    ],
    "success": {
      "fields": {
        "Success (200 OK) response parameters": [
          {
            "group": "200",
            "type": "Object",
            "field": "object",
            "optional": false,
            "description": "<p>Requested object.</p>"
          },
          {
            "group": "200",
            "type": "String",
            "field": "status",
            "optional": false,
            "description": "<p>200.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success (200 OK) response sample:",
          "content": "   HTTP/1.1 200 OK\n   {\n     \"object\": {\n        \"field1\": \"Foo\",\n        \"field2\": \"Bar\",\n        ...\n     },\n     \"status\": 200\n   }\n"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "sources/Event.js"
  },
  {
    "type": "get",
    "url": "/events",
    "title": "look for Events",
    "name": "FindMultipleEvents",
    "group": "Events",
    "permission": {
      "name": "authenticated",
      "title": "Authentication requiered",
      "description": ""
    },
    "description": "<p>look for Events<br/><b>Throw error:</b></p>",
    "examples": [
      {
        "title": "Example ",
        "content": "get http://localhost/events\nget http://localhost/users?sort=asc&eventDate=204-12-24\n"
      }
    ],
    "parameter": {
      "fields": {
        "Parameters (URL)": [
          {
            "group": "urlParam",
            "type": "Number",
            "field": "id",
            "optional": true,
            "description": "<p>Use it to retrieve only one event with its ID.</p>"
          },
          {
            "group": "urlParam",
            "type": "String",
            "field": "eventName",
            "optional": true,
            "description": ""
          },
          {
            "group": "urlParam",
            "type": "String",
            "field": "eventDate",
            "optional": true,
            "description": ""
          },
          {
            "group": "urlParam",
            "type": "String",
            "field": "eventPlace",
            "optional": true,
            "description": ""
          },
          {
            "group": "urlParam",
            "type": "String",
            "field": "sort",
            "optional": true,
            "description": "<p>get the result sorted</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success (200 OK) response parameters": [
          {
            "group": "200",
            "type": "Object[]",
            "field": "objects",
            "optional": false,
            "description": "<p>The list of objects.</p>"
          },
          {
            "group": "200",
            "type": "String",
            "field": "status",
            "optional": false,
            "description": "<p>200.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success (200 OK) response sample:",
          "content": "   HTTP/1.1 200 OK\n   {\n     \"objects\": [\n        \"object\": {\n            \"field1\": \"Foo\",\n            \"field2\": \"Bar\",\n            ...\n        },\n        ...\n     ],\n     \"status\": 200\n   }\n"
        },
        {
          "title": "Success (200 OK) response sample (case of empty):",
          "content": "   HTTP/1.1 200 OK\n   {\n     \"objects\": [ ],\n     \"status\": 200\n   }\n"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "sources/Event.js"
  },
  {
    "type": "post",
    "url": "/events/:id/invitations",
    "title": "Send event invitation",
    "name": "ToDo",
    "group": "Events",
    "version": "0.0.0",
    "filename": "sources/Event.js"
  },
  {
    "type": "get",
    "url": "/events/:id/members/:id",
    "title": "Find project's members",
    "name": "ToDo",
    "group": "Events",
    "version": "0.0.0",
    "filename": "sources/Event.js"
  },
  {
    "type": "put",
    "url": "/events/:id/invitations",
    "title": "Update event invitation",
    "name": "ToDo",
    "group": "Events",
    "version": "0.0.0",
    "filename": "sources/Event.js"
  },
  {
    "type": "get",
    "url": "/events/:id/members",
    "title": "Find one project's member",
    "name": "ToDo",
    "group": "Events",
    "version": "0.0.0",
    "filename": "sources/Event.js"
  },
  {
    "type": "delete",
    "url": "/events/:id/members/:id",
    "title": "Remove one user from an event",
    "name": "ToDo",
    "group": "Events",
    "version": "0.0.0",
    "filename": "sources/Event.js"
  },
  {
    "type": "put",
    "url": "/events",
    "title": "Update an event",
    "name": "UpdateEvent",
    "group": "Events",
    "permission": "authenticated eventOwner",
    "description": "<p>update an event<br/><b>Throw error:</b> 400.</p>",
    "parameter": {
      "fields": {
        "Parameters (Form Data)": [
          {
            "group": "dataParam",
            "type": "String",
            "field": "name",
            "optional": false,
            "description": ""
          },
          {
            "group": "dataParam",
            "type": "String",
            "field": "description",
            "optional": true,
            "description": "<p>A token is required to update password.</p>"
          },
          {
            "group": "dataParam",
            "type": "String",
            "field": "place",
            "optional": true,
            "description": "<p>Required token to update password.</p>"
          },
          {
            "group": "dataParam",
            "type": "String",
            "field": "date",
            "optional": false,
            "description": ""
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Use example",
        "content": "put http://localhost/events\nform-data: description=My_will_such_as_hell&place=toHome\n"
      }
    ],
    "success": {
      "fields": {
        "Success (200 OK) response parameters": [
          {
            "group": "200",
            "type": "Object",
            "field": "object",
            "optional": false,
            "description": "<p>The updated object.</p>"
          },
          {
            "group": "200",
            "type": "String",
            "field": "status",
            "optional": false,
            "description": "<p>200.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success (200 OK) response sample:",
          "content": "HTTP/1.1 200 OK\n{\n   \"object\": {\n       \"field1\": \"Foo\",\n       \"field2\": \"Bar\",\n       ...\n   },\n   \"status\": 200\n}\n"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "sources/Event.js"
  },
  {
    "parameter": {
      "fields": {
        "Parameters (URL)": [
          {
            "group": "urlParam",
            "type": "Number",
            "field": "id",
            "optional": true,
            "description": "<p>Use it to retrieve only one friendship with its ID.</p>"
          },
          {
            "group": "urlParam",
            "type": "String",
            "field": "state",
            "optional": true,
            "description": ""
          },
          {
            "group": "urlParam",
            "type": "String",
            "field": "createdDate",
            "optional": true,
            "description": ""
          },
          {
            "group": "urlParam",
            "type": "String",
            "field": "sort",
            "optional": true,
            "description": "<p>Sort results in differant way.</p>"
          }
        ]
      }
    },
    "group": "Friendship.js",
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "sources/Friendship.js"
  },
  {
    "type": "post",
    "url": "/users/:id/friendships",
    "title": "Create a friendship request",
    "name": "CreateFriendship",
    "group": "Friendships",
    "permission": {
      "name": "authenticated",
      "title": "Authentication requiered",
      "description": ""
    },
    "description": "<p>Create one user friendships.<br/><b>Throw error:</b> 400.</p>",
    "parameter": {
      "fields": {
        "Parameters (Form Data)": [
          {
            "group": "dataParam",
            "type": "Number",
            "field": "target_id",
            "optional": false,
            "description": ""
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Use example",
        "content": "post http://localhost/users/15/friendships\nform-data: target_id=36\n"
      }
    ],
    "success": {
      "fields": {
        "Success (201 CREATED) response parameters": [
          {
            "group": "201",
            "type": "Object",
            "field": "object",
            "optional": false,
            "description": "<p>The created object.</p>"
          },
          {
            "group": "201",
            "type": "String",
            "field": "status",
            "optional": false,
            "description": "<p>201.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success (201 CREATED) response sample:",
          "content": "HTTP/1.1 201 CREATED\n{\n   \"object\": {\n       \"field1\": \"Foo\",\n       \"field2\": \"Bar\",\n       ...\n   },\n   \"status\": 201\n}\n"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "sources/Friendship.js"
  },
  {
    "type": "delete",
    "url": "/users/:id/friendships/:id",
    "title": "Cancel a friendship request",
    "name": "DeleteFriendship",
    "group": "Friendships",
    "version": "0.0.0",
    "filename": "sources/Friendship.js"
  },
  {
    "type": "get",
    "url": "/users/:user_id/friendships/:id",
    "title": "Find a friendship request",
    "name": "FindFriendship",
    "group": "Friendships",
    "groupDescription": "<p>API relatives to friendships. Friendship are a relation between two user. These users are considered as friends. A friendship is not necessary valid.The friendship must be accepted by the target before being established, so the friendship can have several states like (waiting / cancelled / accepted / ...).</p>",
    "description": "<p>Allow to find a friendship by its ID<br/><b>Throw error:</b> 404</p>",
    "permission": "authenticated author",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "field": "user_id",
            "optional": false,
            "description": "<p>User&#39;s ID</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "field": "id",
            "optional": false,
            "description": "<p>Friendship&#39;s ID</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Use example",
        "content": "get http://localhost/users/15/friendships/25\n"
      }
    ],
    "success": {
      "fields": {
        "Success (200 OK) response parameters": [
          {
            "group": "200",
            "type": "Object",
            "field": "object",
            "optional": false,
            "description": "<p>Requested object.</p>"
          },
          {
            "group": "200",
            "type": "String",
            "field": "status",
            "optional": false,
            "description": "<p>200.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success (200 OK) response sample:",
          "content": "   HTTP/1.1 200 OK\n   {\n     \"object\": {\n        \"field1\": \"Foo\",\n        \"field2\": \"Bar\",\n        ...\n     },\n     \"status\": 200\n   }\n"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "sources/Friendship.js"
  },
  {
    "type": "get",
    "url": "/users/:id/friendships",
    "title": "Find friendships requests",
    "name": "FindFriendships",
    "group": "Friendships",
    "permission": "authenticated author",
    "description": "<p>Fetch friendships<br/><b>Throw error:</b></p>",
    "examples": [
      {
        "title": "Use example",
        "content": "get http://localhost/users/:id\nget http://localhost/users/:id?sort=asc&state=accepted\n"
      }
    ],
    "parameter": {
      "fields": {
        "Parameters (URL)": [
          {
            "group": "urlParam",
            "type": "Number",
            "field": "id",
            "optional": true,
            "description": "<p>Use it to retrieve only one friendship with its ID.</p>"
          },
          {
            "group": "urlParam",
            "type": "String",
            "field": "state",
            "optional": true,
            "description": ""
          },
          {
            "group": "urlParam",
            "type": "String",
            "field": "createdDate",
            "optional": true,
            "description": ""
          },
          {
            "group": "urlParam",
            "type": "String",
            "field": "sort",
            "optional": true,
            "description": "<p>Sort results in differant way.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success (200 OK) response parameters": [
          {
            "group": "200",
            "type": "Object[]",
            "field": "objects",
            "optional": false,
            "description": "<p>The list of objects.</p>"
          },
          {
            "group": "200",
            "type": "String",
            "field": "status",
            "optional": false,
            "description": "<p>200.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success (200 OK) response sample:",
          "content": "   HTTP/1.1 200 OK\n   {\n     \"objects\": [\n        \"object\": {\n            \"field1\": \"Foo\",\n            \"field2\": \"Bar\",\n            ...\n        },\n        ...\n     ],\n     \"status\": 200\n   }\n"
        },
        {
          "title": "Success (200 OK) response sample (case of empty):",
          "content": "   HTTP/1.1 200 OK\n   {\n     \"objects\": [ ],\n     \"status\": 200\n   }\n"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "sources/Friendship.js"
  },
  {
    "type": "put",
    "url": "users/:id/friendships/:id",
    "title": "Update friendship",
    "name": "UpdateFriendship",
    "group": "Friendships",
    "version": "0.0.0",
    "filename": "sources/Friendship.js"
  },
  {
    "type": "get",
    "url": "users/:id/friends/:id",
    "title": "Find one user's friend",
    "name": "wxcCreateFriendship",
    "group": "Friendships",
    "version": "0.0.0",
    "filename": "sources/Friendship.js"
  },
  {
    "type": "get",
    "url": "users/:id/friends",
    "title": "Find user's friends",
    "name": "wxcwxcCreateFriendship",
    "group": "Friendships",
    "version": "0.0.0",
    "filename": "sources/Friendship.js"
  },
  {
    "parameter": {
      "fields": {
        "Parameters (URL)": [
          {
            "group": "urlParam",
            "type": "Number",
            "field": "id",
            "optional": true,
            "description": "<p>Use it to retrieve only one user with its ID.</p>"
          },
          {
            "group": "urlParam",
            "type": "String",
            "field": "firstname",
            "optional": true,
            "description": ""
          },
          {
            "group": "urlParam",
            "type": "String",
            "field": "lastname",
            "optional": true,
            "description": ""
          },
          {
            "group": "urlParam",
            "type": "String",
            "field": "sort",
            "optional": true,
            "description": "<p>Sort results in differant way.</p>"
          }
        ]
      }
    },
    "group": "User.js",
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "sources/User.js"
  },
  {
    "type": "post",
    "url": "/users",
    "title": "Create one user",
    "name": "CreateUser",
    "group": "Users",
    "permission": {
      "name": "authenticated",
      "title": "Authentication requiered",
      "description": ""
    },
    "description": "<p>Create one user and retrieve the created object.<br/><b>Throw error:</b> 400.</p>",
    "parameter": {
      "fields": {
        "Parameters (Form Data)": [
          {
            "group": "dataParam",
            "type": "String",
            "field": "email",
            "optional": false,
            "description": ""
          },
          {
            "group": "dataParam",
            "type": "String",
            "field": "password",
            "optional": false,
            "description": ""
          },
          {
            "group": "dataParam",
            "type": "String",
            "field": "firstname",
            "optional": true,
            "description": ""
          },
          {
            "group": "dataParam",
            "type": "String",
            "field": "lastname",
            "optional": true,
            "description": ""
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Use example",
        "content": "post http://localhost/users\nform-data: email=xmax54%40gmail.com&password=password\n"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Error (400 Bad request) response sample (email taken case):",
          "content": "   HTTP/1.1 400 BAD REQUEST\n   {\n     \"message\": \"This email was already taken\",\n     \"code\": \"emailArleadyTaken\",\n     \"status\": \"400\"\n   }\n"
        }
      ]
    },
    "success": {
      "fields": {
        "Success (201 CREATED) response parameters": [
          {
            "group": "201",
            "type": "Object",
            "field": "object",
            "optional": false,
            "description": "<p>The created object.</p>"
          },
          {
            "group": "201",
            "type": "String",
            "field": "status",
            "optional": false,
            "description": "<p>201.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success (201 CREATED) response sample:",
          "content": "HTTP/1.1 201 CREATED\n{\n   \"object\": {\n       \"field1\": \"Foo\",\n       \"field2\": \"Bar\",\n       ...\n   },\n   \"status\": 201\n}\n"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "sources/User.js"
  },
  {
    "type": "delete",
    "url": "/users/:id",
    "title": "Delete one user",
    "name": "DeleteUser",
    "group": "Users",
    "permission": "authenticated accountOwner",
    "description": "<p>Delete a user<br/><b>Throw error:</b> 404.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "field": "id",
            "optional": false,
            "description": "<p>User&#39;s ID</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Use example",
        "content": "delete http://localhost/users/15\n"
      }
    ],
    "success": {
      "fields": {
        "Success (204 NO CONTENT) response parameters": [
          {
            "group": "204",
            "type": "String",
            "field": "status",
            "optional": false,
            "description": "<p>204.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success (204 NO CONTENT) response sample:",
          "content": "HTTP/1.1 204 NO CONTENT\n{\n   \"status\": 204\n}\n"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "sources/User.js"
  },
  {
    "type": "get",
    "url": "/users",
    "title": "Find users",
    "name": "FindMultipleUsers",
    "group": "Users",
    "permission": {
      "name": "authenticated",
      "title": "Authentication requiered",
      "description": ""
    },
    "description": "<p>Fetch users<br/><b>Throw error:</b></p>",
    "examples": [
      {
        "title": "Use example",
        "content": "get http://localhost/users\nget http://localhost/users?sort=asc&firstname=maxime\n"
      }
    ],
    "parameter": {
      "fields": {
        "Parameters (URL)": [
          {
            "group": "urlParam",
            "type": "Number",
            "field": "id",
            "optional": true,
            "description": "<p>Use it to retrieve only one user with its ID.</p>"
          },
          {
            "group": "urlParam",
            "type": "String",
            "field": "firstname",
            "optional": true,
            "description": ""
          },
          {
            "group": "urlParam",
            "type": "String",
            "field": "lastname",
            "optional": true,
            "description": ""
          },
          {
            "group": "urlParam",
            "type": "String",
            "field": "sort",
            "optional": true,
            "description": "<p>Sort results in differant way.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success (200 OK) response parameters": [
          {
            "group": "200",
            "type": "Object[]",
            "field": "objects",
            "optional": false,
            "description": "<p>The list of objects.</p>"
          },
          {
            "group": "200",
            "type": "String",
            "field": "status",
            "optional": false,
            "description": "<p>200.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success (200 OK) response sample:",
          "content": "   HTTP/1.1 200 OK\n   {\n     \"objects\": [\n        \"object\": {\n            \"field1\": \"Foo\",\n            \"field2\": \"Bar\",\n            ...\n        },\n        ...\n     ],\n     \"status\": 200\n   }\n"
        },
        {
          "title": "Success (200 OK) response sample (case of empty):",
          "content": "   HTTP/1.1 200 OK\n   {\n     \"objects\": [ ],\n     \"status\": 200\n   }\n"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "sources/User.js"
  },
  {
    "type": "get",
    "url": "/users/:id",
    "title": "Find one user",
    "name": "FindUser",
    "group": "Users",
    "groupDescription": "<p>API relatives to users</p>",
    "description": "<p>Find a user by its ID<br/><b>Throw error:</b> 404</p>",
    "permission": {
      "name": "authenticated",
      "title": "Authentication requiered",
      "description": ""
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "field": "id",
            "optional": false,
            "description": "<p>User&#39;s ID</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Use example",
        "content": "get http://localhost/users/15\n"
      }
    ],
    "success": {
      "fields": {
        "Success (200 OK) response parameters": [
          {
            "group": "200",
            "type": "Object",
            "field": "object",
            "optional": false,
            "description": "<p>Requested object.</p>"
          },
          {
            "group": "200",
            "type": "String",
            "field": "status",
            "optional": false,
            "description": "<p>200.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success (200 OK) response sample:",
          "content": "   HTTP/1.1 200 OK\n   {\n     \"object\": {\n        \"field1\": \"Foo\",\n        \"field2\": \"Bar\",\n        ...\n     },\n     \"status\": 200\n   }\n"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "sources/User.js"
  },
  {
    "type": "patch",
    "url": "/users/:id",
    "title": "Generate user's password reset token",
    "name": "GenerateUserResetTokenPassword",
    "group": "Users",
    "permission": "authenticated accountOwner",
    "description": "<p><br/><b>Throw error:</b></p>",
    "parameter": {
      "fields": {
        "Parameters (Form Data)": [
          {
            "group": "formData",
            "type": "Boolean",
            "field": "reset_password",
            "optional": false,
            "description": "<p>true / false</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example d'utilisation",
        "content": "patch http://localhost/users/15\nform-data: reset_password=true\n"
      }
    ],
    "version": "0.0.0",
    "filename": "sources/User.js"
  },
  {
    "type": "put",
    "url": "/users",
    "title": "Update one user",
    "name": "UpdateUser",
    "group": "Users",
    "permission": "authenticated accountOwner",
    "description": "<p>Mets à jour un utilisateur et le récupère. Pour mettre à jour le mot de passe, une génération préalable d&#39;un token est requise.le token doit ensuite être spécifié dans la requete.<br/><b>Throw error:</b> 400.</p>",
    "parameter": {
      "fields": {
        "Parameters (Form Data)": [
          {
            "group": "dataParam",
            "type": "String",
            "field": "email",
            "optional": false,
            "description": ""
          },
          {
            "group": "dataParam",
            "type": "String",
            "field": "password",
            "optional": true,
            "description": "<p>A token is required to update password.</p>"
          },
          {
            "group": "dataParam",
            "type": "String",
            "field": "password_token",
            "optional": true,
            "description": "<p>Required token to update password.</p>"
          },
          {
            "group": "dataParam",
            "type": "String",
            "field": "firstname",
            "optional": true,
            "description": ""
          },
          {
            "group": "dataParam",
            "type": "String",
            "field": "lastname",
            "optional": true,
            "description": ""
          },
          {
            "group": "dataParam",
            "type": "String",
            "field": "preference_foo",
            "optional": true,
            "description": "<p>Change the preference foo</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Use example",
        "content": "put http://localhost/users\nform-data: email=xmax54%40gmail.com&firstname=pascal\n"
      }
    ],
    "success": {
      "fields": {
        "Success (200 OK) response parameters": [
          {
            "group": "200",
            "type": "Object",
            "field": "object",
            "optional": false,
            "description": "<p>The updated object.</p>"
          },
          {
            "group": "200",
            "type": "String",
            "field": "status",
            "optional": false,
            "description": "<p>200.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success (200 OK) response sample:",
          "content": "HTTP/1.1 200 OK\n{\n   \"object\": {\n       \"field1\": \"Foo\",\n       \"field2\": \"Bar\",\n       ...\n   },\n   \"status\": 200\n}\n"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "sources/User.js"
  },
  {
    "success": {
      "fields": {
        "Success (200 OK) response parameters": [
          {
            "group": "200",
            "type": "Object",
            "field": "object",
            "optional": false,
            "description": "<p>Requested object.</p>"
          },
          {
            "group": "200",
            "type": "String",
            "field": "status",
            "optional": false,
            "description": "<p>200.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success (200 OK) response sample:",
          "content": "   HTTP/1.1 200 OK\n   {\n     \"object\": {\n        \"field1\": \"Foo\",\n        \"field2\": \"Bar\",\n        ...\n     },\n     \"status\": 200\n   }\n"
        }
      ]
    },
    "group": "_general.js",
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "sources/_general.js"
  },
  {
    "success": {
      "fields": {
        "Success (200 OK) response parameters": [
          {
            "group": "200",
            "type": "Object[]",
            "field": "objects",
            "optional": false,
            "description": "<p>The list of objects.</p>"
          },
          {
            "group": "200",
            "type": "String",
            "field": "status",
            "optional": false,
            "description": "<p>200.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success (200 OK) response sample:",
          "content": "   HTTP/1.1 200 OK\n   {\n     \"objects\": [\n        \"object\": {\n            \"field1\": \"Foo\",\n            \"field2\": \"Bar\",\n            ...\n        },\n        ...\n     ],\n     \"status\": 200\n   }\n"
        },
        {
          "title": "Success (200 OK) response sample (case of empty):",
          "content": "   HTTP/1.1 200 OK\n   {\n     \"objects\": [ ],\n     \"status\": 200\n   }\n"
        }
      ]
    },
    "group": "_general.js",
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "sources/_general.js"
  },
  {
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "field": "Accept-Language",
            "defaultValue": "Locale du navigateur",
            "optional": true,
            "description": "<p>Langue de retour demandée. Exemple : fr-FR.</p>"
          }
        ]
      }
    },
    "group": "_general.js",
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "sources/_general.js"
  },
  {
    "success": {
      "fields": {
        "Success (200 OK) response parameters": [
          {
            "group": "200",
            "type": "Object",
            "field": "object",
            "optional": false,
            "description": "<p>The updated object.</p>"
          },
          {
            "group": "200",
            "type": "String",
            "field": "status",
            "optional": false,
            "description": "<p>200.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success (200 OK) response sample:",
          "content": "HTTP/1.1 200 OK\n{\n   \"object\": {\n       \"field1\": \"Foo\",\n       \"field2\": \"Bar\",\n       ...\n   },\n   \"status\": 200\n}\n"
        }
      ]
    },
    "group": "_general.js",
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "sources/_general.js"
  },
  {
    "success": {
      "fields": {
        "Success (204 NO CONTENT) response parameters": [
          {
            "group": "204",
            "type": "String",
            "field": "status",
            "optional": false,
            "description": "<p>204.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success (204 NO CONTENT) response sample:",
          "content": "HTTP/1.1 204 NO CONTENT\n{\n   \"status\": 204\n}\n"
        }
      ]
    },
    "group": "_general.js",
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "sources/_general.js"
  },
  {
    "error": {
      "fields": {
        "Response attributes": [
          {
            "group": "errorResponse",
            "type": "String",
            "field": "message",
            "optional": false,
            "description": "<p>Error message.</p>"
          },
          {
            "group": "errorResponse",
            "type": "String",
            "field": "description",
            "optional": true,
            "description": "<p>More detailed error message.</p>"
          },
          {
            "group": "errorResponse",
            "type": "String",
            "field": "code",
            "optional": false,
            "description": "<p>Error code (Check the section above).</p>"
          },
          {
            "group": "errorResponse",
            "type": "String",
            "field": "status",
            "optional": false,
            "description": "<p>400, 401, 500, ...</p>"
          },
          {
            "group": "errorResponse",
            "type": "Object[]",
            "field": "params",
            "optional": true,
            "description": "<p>The parameters the error relates to if the error is parameter-specific.</p>"
          },
          {
            "group": "errorResponse",
            "type": "Object[]",
            "field": "params.field",
            "optional": false,
            "description": "<p>The field name relatives to error.</p>"
          },
          {
            "group": "errorResponse",
            "type": "Object[]",
            "field": "params.code",
            "optional": false,
            "description": "<p>The code error.</p>"
          },
          {
            "group": "errorResponse",
            "type": "Object[]",
            "field": "params.message",
            "optional": false,
            "description": "<p>.</p>"
          },
          {
            "group": "errorResponse",
            "type": "Object[]",
            "field": "params.description",
            "optional": true,
            "description": "<p>.</p>"
          }
        ]
      }
    },
    "group": "_general.js",
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "sources/_general.js"
  },
  {
    "error": {
      "examples": [
        {
          "title": "Error (400 Bad request) response sample (case of parameters validation failed):",
          "content": "   HTTP/1.1 400 BAD REQUEST\n   {\n     \"message\": \"The requested parameters are not correct\",\n     \"code\": \"invalidParams\"\n     \"params\": [\n        {\n          \"message\": \"This field should contain at least 4 characters\",\n          \"code\": \"fieldTooShort\"\n          \"field\": \"foo\"\n        },\n        ...\n     ],\n     \"status\": \"400\"\n   }\n"
        }
      ]
    },
    "group": "_general.js",
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "sources/_general.js"
  },
  {
    "error": {
      "examples": [
        {
          "title": "Error (400 Bad request) response sample (email taken case):",
          "content": "   HTTP/1.1 400 BAD REQUEST\n   {\n     \"message\": \"This email was already taken\",\n     \"code\": \"emailArleadyTaken\",\n     \"status\": \"400\"\n   }\n"
        }
      ]
    },
    "group": "_general.js",
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "sources/_general.js"
  },
  {
    "error": {
      "examples": [
        {
          "title": "Error (404 Not Found) response sample:",
          "content": "   HTTP/1.1 404 Not Found\n   {\n     \"message\": \"This user doesn't exist\",\n     \"code\": \"modelNotFound\"\n     \"status\": \"404\"\n   }\n"
        }
      ]
    },
    "group": "_general.js",
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "sources/_general.js"
  },
  {
    "error": {
      "examples": [
        {
          "title": "Error (403 Forbidden Error) response sample:",
          "content": "   HTTP/1.1 403 Forbidden Error\n   {\n     \"message\": \"You do not have enough rights to access this resource\",\n     \"code\": \"noAccessRights\"\n     \"status\": \"403\"\n   }\n"
        }
      ]
    },
    "group": "_general.js",
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "sources/_general.js"
  },
  {
    "error": {
      "examples": [
        {
          "title": "Error (500 Serveur Error) response sample:",
          "content": "   HTTP/1.1 500 Serveur Error\n   {\n     \"message\": \"Database unavailable\",\n     \"code\": \"dbUnavailable\"\n     \"status\": \"500\"\n   }\n"
        }
      ]
    },
    "group": "_general.js",
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "sources/_general.js"
  },
  {
    "success": {
      "fields": {
        "Success (201 CREATED) response parameters": [
          {
            "group": "201",
            "type": "Object",
            "field": "object",
            "optional": false,
            "description": "<p>The created object.</p>"
          },
          {
            "group": "201",
            "type": "String",
            "field": "status",
            "optional": false,
            "description": "<p>201.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success (201 CREATED) response sample:",
          "content": "HTTP/1.1 201 CREATED\n{\n   \"object\": {\n       \"field1\": \"Foo\",\n       \"field2\": \"Bar\",\n       ...\n   },\n   \"status\": 201\n}\n"
        }
      ]
    },
    "group": "_general.js",
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "sources/_general.js"
  }
] });