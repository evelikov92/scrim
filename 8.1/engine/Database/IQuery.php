<?php

namespace Engine\Database;

/**
 * Interface IQuery
 */
interface IQuery
{
    /**
     * Set the Instance to class which is Database Connector
     * @param Adapter $adapter Database Connector Interface
     */
    function setAdapter(Adapter $adapter);

    /**
     * Set the name of database table
     * @param string $table the name of database table
     */
    function table(string $table);

    /**
     * Select clause of sql query which select the columns (properties) of records
     * @param string|array $columns all selected columns from table (string or array)
     */
    function select(string|array $columns);

    /**
     * Insert clause on sql query which is created to add new record on database
     * @param array $columns all columns which is to add on database
     */
    function add(array $columns);

    /**
     * Update clause on sql query which is update current record on database
     * @param array $columns all columns which is update on database
     */
    function update(array $columns);

    /**
     * Delete clause on sql query which is deleted record from database
     */
    function delete();

    /**
     * Join clause on sql query which is just join another table on sql query
     * @param string $table the database table which is need to join
     * @param string $equal the columns ids equals on both databases
     * @param string $type type of join clause (left, inner, outer etc) (Read documentation)
     */
    function join(string $table, string $equal, string $type = 'INNER');

    /**
     * Where clause on sql query which is checked do column is some equal with param
     * @param string $column Column from database table to check do is some equal with param
     * @param string $whereType What type of where is it Where/And/Or
     * @param string $param Value to check do column from database table is some equal with value
     * @param string $operator operator for comparison the column and parameter
     */
    function where(string $column, string $whereType, string $param = '', string $operator = '=');

    /**
     * Where find all records which the column is null
     * @param string $column Column on table which is to check do is null
     */
    function whereNull(string $column);

    /**
     * Where find all records which the column is NOT null
     * @param string $column Column on table which is to check do is NOT null
     */
    function whereNotNull(string $column);

    /**
     * Where find all records which is like between set parameters
     * @param string $column Column on table which is to check do is have record between that params
     * @param array $params Values to check do have records between that params
     */
    function whereBetween(string $column, array $params = []);

    /**
     * Where find all records which is NOT like between set parameters
     * @param string $column Column on table which is to check do is NOT have record between that params
     * @param array $params Values to check do NOT have records between that params
     */
    function whereNotBetween(string $column, array $params = []);

    /**
     * Where find all records which is like set parameters
     * @param string $column Column on table which is to check do is have record like that parameters
     * @param array $params Values to check do have record like that values
     */
    function whereIn(string $column, array $params = []);

    /**
     * Where find all records which is NOT like set parameters
     * @param string $column Column on table which is to check do is have record NOT like that parameters
     * @param array $params Values to check do NOT have record like that values
     */
    function whereNotIn(string $column, array $params = []);

    /**
     * Where date is find record by date time
     * @param string $column Column on table which is with some date time format
     * @param string $dateType Date type format for searching
     * @param string|int $date What date is to be equal
     * @param string $operator operator for comparison the column and date
     */
    function whereDate(string $column, string $dateType, string|int $date, string $operator = '=');

    /**
     * Where column is first column of record to be equal of second column of record
     * @param string $first first column of record
     * @param string $second second column of record
     * @param string $operator operator for comparison the first and second column
     */
    function whereColumn(string $first, string $second, string $operator = '=');

    /**
     * Take clause on sql query which is set how many records to take from database table
     * @param int $limit how many items to take
     */
    function take(int $limit);

    /**
     * Skip clause on sql query which is set how many records to skip from database table
     * @param int $number how many items to skip
     */
    function skip(int $number);

    /**
     * Order clause on sql query which is order by one column
     * @param string $column the column on table with which is to be ordered
     * @param bool $isDesc do is desc or asc
     */
    function orderBy(string $column, bool $isDesc = false);

    /**
     * Group clause on sql query which is set the grouped by column
     * @param string $column the column on table with which is to be grouped
     * @param bool $isDesc do is desc or asc
     */
    function groupBy(string $column, bool $isDesc = false);

    /**
     * Set parameters for created sql query
     * @param array $values SQL query parameters only values
     */
    function setParams(array $values = []);

    /**
     * Prepare the sql query and set what kind of query is will use
     */
    function prepare();

    /**
     * Get the result from created sql query
     */
    function get();

    /**
     * Execute the created sql query
     */
    function execute();

    /**
     * Set Your own sql query
     * @param string $command sql query
     */
    function setCommand(string $command);
}
