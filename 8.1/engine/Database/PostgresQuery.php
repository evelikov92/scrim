<?php

namespace Engine\Database;

class PostgresQuery implements IQuery
{
    /**
     * Database Connector Interface
     * @var Adapter|null
     */
    private ?Adapter $_db = null;

    function setAdapter(Adapter $adapter)
    {
        $this->_db = $adapter;
    }

    public function select(array|string $columns)
    {
        // TODO: Implement select() method.
    }

    public function add(array $columns)
    {
        // TODO: Implement add() method.
    }

    public function update(array $columns)
    {
        // TODO: Implement update() method.
    }

    public function delete()
    {
        // TODO: Implement delete() method.
    }

    public function table(string $table)
    {
        // TODO: Implement table() method.
    }

    public function where(string $column, string $whereType, string $param = '', string $statement = '=')
    {
        // TODO: Implement where() method.
    }

    function whereNull(string $column)
    {
        // TODO: Implement whereNull() method.
    }

    function whereNotNull(string $column)
    {
        // TODO: Implement whereNotNull() method.
    }

    function whereBetween(string $column, array $params = [])
    {
        // TODO: Implement whereBetween() method.
    }

    function whereNotBetween(string $column, array $params = [])
    {
        // TODO: Implement whereNotBetween() method.
    }

    function whereIn(string $column, array $params = [])
    {
        // TODO: Implement whereIn() method.
    }

    function whereNotIn(string $column, array $params = [])
    {
        // TODO: Implement whereNotIn() method.
    }

    function whereDate(string $column, string $dateType, int|string $date, string $operator = '=')
    {
        // TODO: Implement whereDate() method.
    }

    function whereColumn(string $first, string $second, string $operator = '=')
    {
        // TODO: Implement whereColumn() method.
    }

    function take(int $limit)
    {
        // TODO: Implement take() method.
    }

    function skip(int $number)
    {
        // TODO: Implement skip() method.
    }

    function orderBy(string $column, bool $isDesc = false)
    {
        // TODO: Implement orderBy() method.
    }

    function groupBy(string $column, bool $isDesc = false)
    {
        // TODO: Implement groupBy() method.
    }

    function setParams(array $values = [])
    {
        // TODO: Implement setParams() method.
    }

    function getParams()
    {
        // TODO: Implement getParams() method.
    }

    function prepare()
    {
        // TODO: Implement prepare() method.
    }

    function get()
    {
        // TODO: Implement get() method.
    }

    function execute()
    {
        // TODO: Implement execute() method.
    }

    function getCommand()
    {
        // TODO: Implement getCommand() method.
    }

    function setCommand(string $command)
    {
        // TODO: Implement setCommand() method.
    }
}