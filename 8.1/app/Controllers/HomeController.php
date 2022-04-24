<?php

namespace App\Controllers;

use Engine\Http\BaseController;
use Engine\Http\StatusCodes;

/**
 * Manage all custom routes
 */
class HomeController extends BaseController
{
    public function __construct()
    {
        parent::__construct();
    }

    public final function index()
    {
        $this->response
            ->statusCode(StatusCodes::OK)
            ->page($this->config('app', 'public_folder') . 'index.html')
            ->send();
    }

    public final function getUserLanguage()
    {
        $this->response
            ->statusCode(StatusCodes::OK)
            ->json([ 'lang' => $this->getLanguage() ])
            ->send();
    }

    public final function setUserLanguage()
    {
        $lang = $this->request->inputParam('lang', 'text|required|length:2');
        $this->checkErrors();

        $this->setLanguage($lang);
        $this->response
            ->statusCode(StatusCodes::OK)
            ->flag(1)
            ->send();
    }

    public final function getLanguageResources()
    {
        $this->response
            ->statusCode(StatusCodes::OK)
            ->json($this->resources())
            ->send();
    }
}
