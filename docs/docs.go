// Package docs GENERATED BY SWAG; DO NOT EDIT
// This file was generated by swaggo/swag
package docs

import "github.com/swaggo/swag"

const docTemplate = `{
    "schemes": {{ marshal .Schemes }},
    "swagger": "2.0",
    "info": {
        "description": "{{escape .Description}}",
        "title": "{{.Title}}",
        "contact": {},
        "version": "{{.Version}}"
    },
    "host": "{{.Host}}",
    "basePath": "{{.BasePath}}",
    "paths": {
        "/api/v1/benches": {
            "get": {
                "description": "Get list active benches",
                "tags": [
                    "Benches"
                ],
                "summary": "List benches",
                "parameters": [
                    {
                        "type": "string",
                        "description": "sort field",
                        "name": "sort_by",
                        "in": "query"
                    },
                    {
                        "type": "string",
                        "description": "sort order",
                        "name": "sort_order",
                        "in": "query"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/domain.Bench"
                            }
                        }
                    },
                    "400": {
                        "description": "Bad Request",
                        "schema": {
                            "$ref": "#/definitions/apperror.AppError"
                        }
                    }
                }
            }
        },
        "/api/v1/benches/moderation": {
            "get": {
                "description": "Get list moderation benches",
                "tags": [
                    "Benches Moderation"
                ],
                "summary": "Moderation list benches",
                "parameters": [
                    {
                        "type": "string",
                        "description": "Bearer",
                        "name": "Authorization",
                        "in": "header",
                        "required": true
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/domain.Bench"
                            }
                        }
                    },
                    "400": {
                        "description": "Bad Request",
                        "schema": {
                            "$ref": "#/definitions/apperror.AppError"
                        }
                    }
                }
            },
            "post": {
                "description": "Accept or reject a bench",
                "tags": [
                    "Benches Moderation"
                ],
                "summary": "Decision bench",
                "parameters": [
                    {
                        "description": "decision bench data",
                        "name": "Decision",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/dto.DecisionBench"
                        }
                    },
                    {
                        "type": "string",
                        "description": "Bearer",
                        "name": "Authorization",
                        "in": "header",
                        "required": true
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK"
                    },
                    "400": {
                        "description": "Bad Request",
                        "schema": {
                            "$ref": "#/definitions/apperror.AppError"
                        }
                    }
                }
            }
        },
        "/api/v1/benches/telegram": {
            "post": {
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "Benches Moderation"
                ],
                "summary": "Create bench via telegram",
                "parameters": [
                    {
                        "description": "bench data",
                        "name": "CreateBenchViaTelegram",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/dto.CreateBenchViaTelegram"
                        }
                    }
                ],
                "responses": {
                    "201": {
                        "description": "Created"
                    },
                    "400": {
                        "description": "Bad Request"
                    }
                }
            }
        },
        "/api/v1/benches/{id}": {
            "get": {
                "description": "Get detail active bench",
                "tags": [
                    "Benches"
                ],
                "summary": "Detail bench",
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/domain.Bench"
                        }
                    },
                    "400": {
                        "description": "Bad Request",
                        "schema": {
                            "$ref": "#/definitions/apperror.AppError"
                        }
                    }
                }
            }
        },
        "/api/v1/bot/auth": {
            "post": {
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "Bot"
                ],
                "summary": "Authorization bot",
                "parameters": [
                    {
                        "description": "bot info",
                        "name": "user",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/dto.AuthorizationBot"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK"
                    },
                    "403": {
                        "description": "Forbidden"
                    }
                }
            }
        },
        "/api/v1/bot/refresh": {
            "post": {
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "Bot"
                ],
                "summary": "Bot refresh token",
                "parameters": [
                    {
                        "type": "string",
                        "description": "Bearer",
                        "name": "Authorization",
                        "in": "header",
                        "required": true
                    },
                    {
                        "description": "token info",
                        "name": "token",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/dto.RefreshToken"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK"
                    },
                    "400": {
                        "description": "Bad Request"
                    }
                }
            }
        },
        "/api/v1/comments": {
            "post": {
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "Comments"
                ],
                "summary": "Create comment",
                "parameters": [
                    {
                        "description": "comment data",
                        "name": "CreateComment",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/dto.CreateComment"
                        }
                    },
                    {
                        "type": "string",
                        "description": "Bearer",
                        "name": "Authorization",
                        "in": "header",
                        "required": true
                    }
                ],
                "responses": {
                    "201": {
                        "description": "Created"
                    },
                    "400": {
                        "description": "Bad Request"
                    }
                }
            },
            "patch": {
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "Comments"
                ],
                "summary": "Update comment",
                "parameters": [
                    {
                        "description": "comment data",
                        "name": "UpdateComment",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/dto.UpdateComment"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK"
                    },
                    "400": {
                        "description": "Bad Request"
                    }
                }
            }
        },
        "/api/v1/comments/{id}": {
            "get": {
                "description": "Get list comments by bench",
                "tags": [
                    "Comments"
                ],
                "summary": "List comments by bench",
                "parameters": [
                    {
                        "type": "string",
                        "description": "Bench ID",
                        "name": "id",
                        "in": "path",
                        "required": true
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/domain.Comment"
                            }
                        }
                    },
                    "400": {
                        "description": "Bad Request",
                        "schema": {
                            "$ref": "#/definitions/apperror.AppError"
                        }
                    }
                }
            }
        },
        "/api/v1/reports/comments": {
            "post": {
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "Reports"
                ],
                "summary": "Create report comment",
                "parameters": [
                    {
                        "description": "report comment data",
                        "name": "CreateComment",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/dto.CreateReportComment"
                        }
                    },
                    {
                        "type": "string",
                        "description": "Bearer",
                        "name": "Authorization",
                        "in": "header",
                        "required": true
                    }
                ],
                "responses": {
                    "201": {
                        "description": "Created"
                    },
                    "400": {
                        "description": "Bad Request"
                    },
                    "409": {
                        "description": "Conflict"
                    }
                }
            }
        },
        "/api/v1/reports/comments/moderation": {
            "get": {
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "Reports"
                ],
                "summary": "List moderation report comments",
                "responses": {
                    "200": {
                        "description": "OK"
                    },
                    "418": {
                        "description": "I'm a teapot"
                    }
                }
            }
        },
        "/api/v1/tags": {
            "get": {
                "description": "Get list tags",
                "tags": [
                    "Tags"
                ],
                "summary": "List tags",
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/domain.Tag"
                            }
                        }
                    },
                    "400": {
                        "description": "Bad Request",
                        "schema": {
                            "$ref": "#/definitions/apperror.AppError"
                        }
                    }
                }
            },
            "post": {
                "description": "Create tag",
                "tags": [
                    "Tags"
                ],
                "summary": "Create tag",
                "parameters": [
                    {
                        "description": "tag data",
                        "name": "CreateTag",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/dto.CreateTag"
                        }
                    }
                ],
                "responses": {
                    "400": {
                        "description": "Bad Request",
                        "schema": {
                            "$ref": "#/definitions/apperror.AppError"
                        }
                    },
                    "403": {
                        "description": "Forbidden",
                        "schema": {
                            "$ref": "#/definitions/apperror.AppError"
                        }
                    }
                }
            }
        },
        "/api/v1/users": {
            "post": {
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "Users"
                ],
                "summary": "User registration",
                "parameters": [
                    {
                        "description": "user info",
                        "name": "user",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/dto.CreateUser"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK"
                    },
                    "400": {
                        "description": "Bad Request"
                    }
                }
            }
        },
        "/api/v1/users/me": {
            "get": {
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "Users"
                ],
                "summary": "Get Me",
                "parameters": [
                    {
                        "type": "string",
                        "description": "Bearer",
                        "name": "Authorization",
                        "in": "header",
                        "required": true
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK"
                    },
                    "418": {
                        "description": "I'm a teapot"
                    }
                }
            }
        },
        "/api/v1/users/refresh": {
            "post": {
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "Users"
                ],
                "summary": "User refresh token",
                "parameters": [
                    {
                        "type": "string",
                        "description": "Bearer",
                        "name": "Authorization",
                        "in": "header",
                        "required": true
                    },
                    {
                        "description": "token info",
                        "name": "token",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/dto.RefreshToken"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK"
                    },
                    "400": {
                        "description": "Bad Request"
                    }
                }
            }
        }
    },
    "definitions": {
        "apperror.AppError": {
            "type": "object",
            "properties": {
                "details": {
                    "type": "array",
                    "items": {
                        "type": "integer"
                    }
                },
                "message": {
                    "type": "string"
                }
            }
        },
        "domain.Bench": {
            "type": "object",
            "properties": {
                "id": {
                    "type": "string"
                },
                "images": {
                    "type": "array",
                    "items": {
                        "type": "string"
                    }
                },
                "is_active": {
                    "type": "boolean"
                },
                "lat": {
                    "type": "number"
                },
                "lng": {
                    "type": "number"
                },
                "tags": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/domain.Tag"
                    }
                }
            }
        },
        "domain.Comment": {
            "type": "object",
            "properties": {
                "author_id": {
                    "type": "string"
                },
                "bench_id": {
                    "type": "string"
                },
                "content": {
                    "type": "string"
                },
                "id": {
                    "type": "string"
                },
                "nested_comments": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/domain.Comment"
                    }
                },
                "parent_id": {
                    "type": "string"
                }
            }
        },
        "domain.Tag": {
            "type": "object",
            "properties": {
                "id": {
                    "type": "string"
                },
                "title": {
                    "type": "string"
                }
            }
        },
        "dto.AuthorizationBot": {
            "type": "object",
            "properties": {
                "login": {
                    "type": "string"
                },
                "password": {
                    "type": "string"
                }
            }
        },
        "dto.CreateBenchViaTelegram": {
            "type": "object",
            "properties": {
                "images": {
                    "type": "array",
                    "items": {
                        "type": "array",
                        "items": {
                            "type": "integer"
                        }
                    }
                },
                "lat": {
                    "type": "number"
                },
                "lng": {
                    "type": "number"
                },
                "user_telegram_id": {
                    "type": "integer"
                }
            }
        },
        "dto.CreateComment": {
            "type": "object",
            "properties": {
                "bench_id": {
                    "type": "string"
                },
                "content": {
                    "type": "string"
                },
                "parent_id": {
                    "type": "string"
                }
            }
        },
        "dto.CreateReportComment": {
            "type": "object",
            "properties": {
                "cause": {
                    "type": "string"
                },
                "comment_id": {
                    "type": "string"
                },
                "id": {
                    "type": "string"
                }
            }
        },
        "dto.CreateTag": {
            "type": "object",
            "properties": {
                "title": {
                    "type": "string"
                }
            }
        },
        "dto.CreateUser": {
            "type": "object",
            "properties": {
                "auth_date": {
                    "type": "integer"
                },
                "first_name": {
                    "type": "string"
                },
                "hash": {
                    "type": "string"
                },
                "id": {
                    "type": "integer"
                },
                "last_name": {
                    "type": "string"
                },
                "photo_url": {
                    "type": "string"
                },
                "username": {
                    "type": "string"
                }
            }
        },
        "dto.DecisionBench": {
            "type": "object",
            "properties": {
                "decision": {
                    "type": "boolean"
                },
                "id": {
                    "type": "string"
                },
                "message": {
                    "type": "string"
                }
            }
        },
        "dto.RefreshToken": {
            "type": "object",
            "properties": {
                "token": {
                    "type": "string"
                }
            }
        },
        "dto.UpdateComment": {
            "type": "object",
            "properties": {
                "content": {
                    "type": "string"
                },
                "id": {
                    "type": "string"
                }
            }
        }
    }
}`

// SwaggerInfo holds exported Swagger Info so clients can modify it
var SwaggerInfo = &swag.Spec{
	Version:          "",
	Host:             "",
	BasePath:         "",
	Schemes:          []string{},
	Title:            "",
	Description:      "",
	InfoInstanceName: "swagger",
	SwaggerTemplate:  docTemplate,
}

func init() {
	swag.Register(SwaggerInfo.InstanceName(), SwaggerInfo)
}
