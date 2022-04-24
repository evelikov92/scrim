<?php

namespace Engine\Model;

use Engine\Database\MySqlQuery;

abstract class Model
{
    protected string $_table = '';

    protected array $_columns = [];

    protected MySqlQuery $_db;

    public function __construct(string $table)
    {
        $this->_table = $table;
        $this->_db = MySqlQuery::getInstance();
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
