<?php

namespace Engine\Database;

/**
 * Interface IQuery
 * @package Engine\Database
 */
interface IQuery
{
    public function select($columns);

    public function add($columns);

    public function update($columns);

    public function delete();

    public function table($table);

    public function where($column, $param, $statement);
}
