<?php

namespace Engine\Model;

use Engine\Database\Database;
use Engine\Database\IQuery;

abstract class Model
{
    protected string $_table = '';

    protected array $_columns = [];

    protected IQuery $_db;

    public function __construct(string $table)
    {
        $this->_table = $table;
        $this->_db = Database::getInstance()->db();
    }

    /**
     *
     * @return void
     */
    public function create() : void
    {

    }

    /**
     *
     * @param int $id
     * @return void
     */
    public function get(int $id) : void
    {
//        foreach ($arr as $key => $val) {
//            $this->{$key} = $val;
//        }
    }
}
