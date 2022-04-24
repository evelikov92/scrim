<?php

namespace Engine\Database;

/**
 * Interface IQuery
 */
interface IQuery
{
    public function select(string|array $columns);

    public function add(array $columns);

    public function update(array $columns);

    public function delete();

    public function table(string $table);

    public function where(string $column, string $whereType, string $param = '', string $statement = '=');
}
