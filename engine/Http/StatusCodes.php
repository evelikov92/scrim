<?php

namespace Engine\Http;

/**
 * Constants of every common HTTP Response Code
 * @package Engine\Http
 */
class StatusCodes
{
    // Is OK can continue
    public static $_CONTINUE = 100;
    public static $_SWITCHING_PROTOCOLS = 101;
    public static $_PROCESSING = 102;

    // Is OK can continue
    public static $_OK = 200;
    public static $_CREATED = 201;
    public static $_ACCEPTED = 202;
    public static $_NON_AUTHORITATIVE_INFORMATION = 203;
    public static $_NO_CONTENT = 204;
    public static $_RESET_CONTENT = 205;
    public static $_PARTIAL_CONTENT = 206;
    public static $_MULTI_STATUS = 207;

    // Is OK but be careful
    public static $_MULTIPLE_CHOICES = 300;
    public static $_MOVED_PERMANENTLY = 301;
    public static $_FOUND = 302;
    public static $_SEE_OTHER = 303;
    public static $_NOT_MODIFIED = 304;
    public static $_USE_PROXY = 305;
    public static $_TEMPORARY_REDIRECT = 307;

    // Is Not OK something not correct with request. Need to change the request
    public static $_BAD_REQUEST = 400;
    public static $_UNAUTHORIZED = 401;
    public static $_PAYMENT_REQUIRED = 402;
    public static $_FORBIDDEN = 403;
    public static $_NOT_FOUND = 404;
    public static $_METHOD_NOT_ALLOWED = 405;
    public static $_NOT_ACCEPTABLE = 406;
    public static $_PROXY_AUTHENTICATION_REQUIRED = 407;
    public static $_REQUEST_TIMEOUT = 408;
    public static $_CONFLICT = 409;
    public static $_GONE = 410;
    public static $_LENGTH_REQUIRED = 411;
    public static $_PRECONDITION_FAILED = 412;
    public static $_REQUEST_ENTITY_TOO_LARGE = 413;
    public static $_REQUEST_URI_TOO_LONG = 414;
    public static $_UNSUPPORTED_MEDIA_TYPE = 415;
    public static $_REQUESTED_RANGE_NOT_SATISFIABLE = 416;
    public static $_EXPECTATION_FAILED = 417;
    public static $_UNCROSSABLE_ENTITY = 422;
    public static $_LOCKED = 423;
    public static $_FAILED_DEPENDENCY = 424;
    public static $_UPGRADE_REQUIRED = 426;

    // Is Not OK. Is have mistake on the source code. And server return mistake
    public static $_INTERNAL_SERVER_ERROR = 500;
    public static $_NOT_IMPLEMENTED = 501;
    public static $_BAD_GATEWAY = 502;
    public static $_SERVICE_UNAVAILABLE = 503;
    public static $_GATEWAY_TIMEOUT = 504;
    public static $_HTTP_VERSION_NOT_SUPPORTED = 505;
    public static $_VARIANT_ALSO_NEGOTIATES = 506;
    public static $_INSUFFICIENT_STORAGE = 507;
    public static $_BANDWIDTH_LIMIT_EXCEEDED = 509;
    public static $_NOT_EXTENDED = 510;
}
