<?php

namespace Engine\Database;

use Engine\ErrorHandler\ErrorHandler;
use Engine\Http\StatusCodes;

/**
 * Query Builder for easy way to create MySQL queries
 */
class MySqlQuery implements IQuery
{
    /**
     * where clause for sql query
     * @var string
     */
    private string $_where = '';

    /**
     * select clause for sql query
     * @var string
     */
    private string $_select = '';

    /**
     * from clause for sql query
     * @var string
     */
    private string $_from = '';

    /**
     * order by clause for sql query
     * @var string
     */
    private string $_orderBy = '';

    /**
     * group by clause for sql query
     * @var string
     */
    private string $_groupBy = '';

    /**
     * limit clause for sql query
     * @var string
     */
    private string $_limit = '';

    /**
     * skip clause for sql query
     * @var string
     */
    private string $_skip = '';

    /**
     * join clause for sql query
     * @var string
     */
    private string $_join = '';

    /**
     * insert clause for sql query
     * @var string
     */
    private string $_insert = '';

    /**
     * delete clause for sql query
     * @var string
     */
    private string $_delete = '';

    /**
     * update clause for sql query
     * @var string
     */
    private string $_update = '';

    /**
     * finally sql query builder
     * @var string
     */
    private string $_command = '';

    /**
     * what table is select on database
     * @var string
     */
    private string $_table = '';

    /**
     * what kind of command is used for create sql query
     * @var string
     */
    private string $_option = '';

    /**
     * Database Connector Interface
     * @var Adapter|null
     */
    private ?Adapter $_db = null;

    /**
     * All parameters which user is set for sql query
     * @var array
     */
    private array $_params = [];

    /**
     * Set the Instance to class which is Database Connector
     * @param Adapter $adapter Database Connector Interface
     */
    public function setAdapter(Adapter $adapter) : void
    {
        $this->_db = $adapter;
    }

    /**
     * Set the name of database table
     * @param string $table the name of database table
     * @return MySqlQuery Creator of sql queries and connect to database
     */
    public function table(string $table) : MySqlQuery
    {
        $this->_from = " FROM `$table`";
        $this->_table = $table;
        return $this;
    }

    /**
     * Select clause of sql query which select the columns (properties) of records
     * @param string|array $columns all selected columns from table (string or array)
     * @return MySqlQuery Creator of sql queries and connect to database
     */
    public function select(string|array $columns = "*") : MySqlQuery
    {
        if (is_array($columns)) {
            $this->_select = 'SELECT ' . implode(', ', $columns);
        } else if(!empty($columns)) {
            $this->_select = "SELECT $columns";
        } else {
            new ErrorHandler(
                StatusCodes::INTERNAL_SERVER_ERROR,
                'The $columns variable is empty string or array'
            );
        }

        $this->_option = 'select';
        return $this;
    }

    /**
     * Insert clause on sql query which is created to add new record on database
     * @param array $columns all columns which is to add on database
     * @return MySqlQuery Creator of sql queries and connect to database
     */
    public function add(array $columns) : MySqlQuery
    {
        $values = $this->_returnSymbolParamsCount($columns);
        if (empty($columns)) {
            new ErrorHandler(
                StatusCodes::INTERNAL_SERVER_ERROR,
                'The $columns variable is empty array!'
            );
        }

        $this->_insert = "INSERT INTO `$this->_table` ( " . implode(", ",  $columns) . " ) VALUES ( $values )";
        $this->_option = 'insert';
        return $this;
    }

    /**
     * Update clause on sql query which is update current record on database
     * @param array $columns all columns which is update on database
     * @return MySqlQuery Creator of sql queries and connect to database
     */
    public function update(array $columns) : MySqlQuery
    {
        $countOfColumns = count($columns);
        if ($this->_table && $countOfColumns) {
            $this->_update = 'UPDATE ' . $this->_table . ' SET ';

            for ($i = 0; $i < $countOfColumns; ++$i) {
                if ($i === $countOfColumns - 1) {
                    $this->_update .= " $columns[$i] = ?";
                } else {
                    $this->_update .= " $columns[$i] = ?, ";
                }
            }

            $this->_option = 'update';
        } else {
            new ErrorHandler(
                StatusCodes::INTERNAL_SERVER_ERROR,
                'The $columns variable is required to be array!'
            );
        }

        return $this;
    }

    /**
     * Delete clause on sql query which is deleted record from database
     * @return MySqlQuery Creator of sql queries and connect to database
     */
    public function delete() : MySqlQuery
    {
        if (!$this->_table) {
            new ErrorHandler(
                StatusCodes::INTERNAL_SERVER_ERROR,
                'Is need to enter in which table is need to delete record! So please first used table method!'
            );
        }

        $this->_delete = "DELETE FROM $this->_table ";
        $this->_option = 'delete';

        return $this;
    }

    /**
     * Join clause on sql query which is just join another table on sql query
     * @param string $table the database table which is need to join
     * @param string $equal the columns ids equals on both databases
     * @param string $type type of join clause (left, inner, outer etc) (Read documentation)
     * @return MySqlQuery Creator of sql queries and connect to database
     */
    public function join(string $table, string $equal, string $type = 'INNER') : MySqlQuery
    {
        if ($table && $equal){
            $this->_join .= " $type JOIN $table ON $equal";
        } else {
            new ErrorHandler(
                StatusCodes::INTERNAL_SERVER_ERROR,
                'The $table and $equal variable are required!'
            );
        }

        return $this;
    }

    /**
     * Where clause on sql query which is checked do column is some equal with param
     * @param string $column Column from database table to check do is some equal with param
     * @param string $whereType What type of where is it Where/And/Or
     * @param string $param Value to check do column from database table is some equal with value
     * @param string $operator operator for comparison the column and parameter
     * @return MySqlQuery Creator of sql queries and connect to database
     */
    public function where(string $column, string $whereType = 'where', string $param = '', string $operator = '=') : MySqlQuery
    {
        $this->_where = ' ' . $whereType . ' ' . $column . str_replace('"', '', $operator) . ' ?';
        if (!empty($param)) {
            $this->_params[$column] = $param;
        }

        return $this;
    }

    /**
     * Where find all records which the column is null
     * @param string $column Column on table which is to check do is null
     * @return MySqlQuery Creator of sql queries and connect to database
     */
    public function whereNull(string $column) : MySqlQuery
    {
        if (empty($this->_where)) {
            $this->_where = " WHERE $column is null";
        } else {
            $this->_where .= " AND $column is null";
        }

        return $this;
    }

    /**
     * Where find all records which the column is NOT null
     * @param string $column Column on table which is to check do is NOT null
     * @return MySqlQuery Creator of sql queries and connect to database
     */
    public function whereNotNull(string $column) : MySqlQuery
    {
        if (empty($this->_where)) {
            $this->_where = " WHERE $column is not null";
        } else {
            $this->_where .= " AND $column is not null";
        }

        return $this;
    }

    /**
     * Where find all records which is like between set parameters
     * @param string $column Column on table which is to check do is have record between that params
     * @param array $params Values to check do have records between that params
     * @return MySqlQuery Creator of sql queries and connect to database
     */
    public function whereBetween(string $column, array $params = []) : MySqlQuery
    {
        if (empty($this->_where)) {
            $this->_where = " WHERE $column BETWEEN ? AND ? ";
        } else {
            $this->_where .= " AND $column BETWEEN ? AND ? ";
        }
        foreach ($params as $key => $value) {
            $this->_params[$key] = $value;
        }

        return $this;
    }

    /**
     * Where find all records which is NOT like between set parameters
     * @param string $column Column on table which is to check do is NOT have record between that params
     * @param array $params Values to check do NOT have records between that params
     * @return MySqlQuery Creator of sql queries and connect to database
     */
    public function whereNotBetween(string $column, array $params = []) : MySqlQuery
    {
        if (empty($this->_where)) {
            $this->_where = " WHERE $column NOT BETWEEN ? AND ? ";
        } else {
            $this->_where .= " AND $column NOT BETWEEN ? AND ? ";
        }
        foreach ($params as $key => $value) {
            $this->_params[$key] = $value;
        }

        return $this;
    }

    /**
     * Where find all records which is like set parameters
     * @param string $column Column on table which is to check do is have record like that parameters
     * @param array $params Values to check do have record like that values
     * @return MySqlQuery Creator of sql queries and connect to database
     */
    public function whereIn(string $column, array $params = []) : MySqlQuery
    {
        $symbols = $this->_returnSymbolParamsCount($params);
        if (empty($this->_where)) {
            $this->_where = " WHERE $column IN ( $symbols )";
        } else {
            $this->_where .= " AND $column IN ( $symbols )";
        }
        foreach ($params as $key => $value) {
            $this->_params[$key] = $value;
        }

        return $this;
    }

    /**
     * Where find all records which is NOT like set parameters
     * @param string $column Column on table which is to check do is have record NOT like that parameters
     * @param array $params Values to check do NOT have record like that values
     * @return MySqlQuery Creator of sql queries and connect to database
     */
    public function whereNotIn(string $column, array $params = []) : MySqlQuery
    {
        $symbol = $this->_returnSymbolParamsCount($params);
        if (empty($this->_where)) {
            $this->_where = " WHERE $column NOT IN ( $symbol )";
        } else {
            $this->_where .= " AND $column NOT IN ( $symbol )";
        }
        foreach ($params as $key => $value) {
            $this->_params[$key] = $value;
        }

        return $this;
    }

    /**
     * Where date is find record by date time
     * @param string $column Column on table which is with some date time format
     * @param string $dateType Date type format for searching
     * @param string|int $date What date is to be equal
     * @param string $operator operator for comparison the column and date
     * @return MySqlQuery Creator of sql queries and connect to database
     */
    public function whereDate(string $column, string $dateType, string|int $date, string $operator = '=') : MySqlQuery
    {
        if (empty($this->_where)){
            $this->_where = " WHERE $dateType ( $column } $operator ? ";
        } else {
            $this->_where .= " AND $dateType ( $column } $operator ? ";
        }
        $this->_params[] = $date;

        return $this;
    }

    /**
     * Where column is first column of record to be equal of second column of record
     * @param string $first first column of record
     * @param string $second second column of record
     * @param string $operator operator for comparison the first and second column
     * @return MySqlQuery Creator of sql queries and connect to database
     */
    public function whereColumn(string $first, string $second, string $operator = '=') : MySqlQuery
    {
        if (empty($this->_where)) {
            $this->_where = " WHERE $first $operator $second";
        } else {
            $this->_where .= " AND $first $operator $second";
        }

        return $this;
    }

    /**
     * Take clause on sql query which is set how many records to take from database table
     * @param int $limit how many items to take
     * @return MySqlQuery Creator of sql queries and connect to database
     */
    public function take(int $limit) : MySqlQuery
    {
        $this->_limit = " LIMIT $limit";
        return $this;
    }

    /**
     * Skip clause on sql query which is set how many records to skip from database table
     * @param int $number how many items to skip
     * @return MySqlQuery Creator of sql queries and connect to database
     */
    public function skip(int $number) : MySqlQuery
    {
        $this->_skip = " OFFSET $number";
        return $this;
    }

    /**
     * Order clause on sql query which is order by one column
     * @param string $column the column on table with which is to be ordered
     * @param bool $isDesc do is desc or asc
     * @return MySqlQuery Creator of sql queries and connect to database
     */
    public function orderBy(string $column, bool $isDesc = false) : MySqlQuery
    {
        if (empty($this->_orderBy)) {
            $this->_orderBy = " ORDER BY $column ";
        } else {
            $this->_orderBy = ", $column ";
        }

        if ($isDesc) {
            $this->_orderBy .= ' DESC ';
        }

        return $this;
    }

    /**
     * Group clause on sql query which is set the grouped by column
     * @param string $column the column on table with which is to be grouped
     * @param bool $isDesc do is desc or asc
     * @return MySqlQuery Creator of sql queries and connect to database
     */
    public function groupBy(string $column, bool $isDesc = false) : MySqlQuery
    {
        $this->_groupBy = " GROUP BY $column ";
        if ($isDesc) {
            $this->_groupBy .= ' DESC ';
        }

        return $this;
    }

    /**
     * Set parameters for created sql query
     * @param array $values SQL query parameters only values
     * @return MySqlQuery Creator of sql queries and connect to database
     */
    public function setParams(array $values = []) : MySqlQuery
    {
        $count = count($values);
        if (!$count) {
            new ErrorHandler(
                StatusCodes::INTERNAL_SERVER_ERROR,
                'The $values variable is required to be array!'
            );
        }

        for ($i = $count - 1; $i >= 0; --$i) {
            // Add new parameters on beginning of the params
            array_unshift($this->_params, $values[$i]);
        }

        return $this;
    }

    /**
     * Get all sql query parameters
     * @return array sql query parameters
     */
    public function getParams() : array
    {
        return $this->_params;
    }

    /**
     * Prepare the sql query and set what kind of query is will use
     * @return MySqlQuery Creator of sql queries and connect to database
     */
    public function prepare() : MySqlQuery
    {
        if (empty($this->_option)) {
            $this->_db->prepare($this->_command);
            $this->_command = '';
            return $this;
        }

        // TODO Possible to have some mistake
        if ($this->_option === 'select') {
            $this->_command = $this->_select . $this->_from . $this->_join . $this->_where . $this->_groupBy . $this->_orderBy . $this->_limit . $this->_skip;
        } else if ($this->_option === 'insert') {
            $this->_command = $this->_insert;
        } else if ($this->_option === 'update') {
            $this->_command = $this->_update . $this->_where;
        } else if ($this->_option === 'delete') {
            $this->_command = $this->_delete . $this->_where;
        } else {
            $this->_command .= $this->_where . $this->_limit . $this->_skip;
        }

        $this->_db->prepare($this->_command);

        $this->_option = '';
        $this->_select = '';
        $this->_from = '';
        $this->_join = '';
        $this->_groupBy = '';
        $this->_where = '';
        $this->_orderBy = '';
        $this->_limit = '';
        $this->_skip = '';
        $this->_insert = '';
        $this->_update = '';
        $this->_delete = '';

        return $this;
    }

    /**
     * Get the result from created sql query
     * @return Adapter sql query result
     */
    public function get() : Adapter
    {
        $this->_db->setParams(array_values($this->_params));
        $this->_params = [];
        return $this->_db->execute();
    }

    /**
     * Execute the created sql query
     */
    public function execute() : void
    {
        if (!empty($this->_params) || !$this->_option) {
            $this->_db->execute(array_values($this->_params));
            $this->_params = [];
        } else {
            $this->_db->execute();
        }
    }

    /**
     * Get the created sql query
     * @return string sql query
     */
    public function getCommand() : string
    {
        return $this->_command;
    }

    /**
     * Set Your own sql query
     * @param string $command sql query
     * @return MySqlQuery Creator of sql queries and connect to database
     */
    public function setCommand(string $command) : MySqlQuery
    {
        $this->_command = $command;
        return $this;
    }

    /**
     * Generate ? symbol for sql query for every parameter
     * @param array $columns list of all parameters on sql query
     * @return string correct syntax for query builder of parameters
     */
    private function _returnSymbolParamsCount(array $columns) : string
    {
        $symbols = str_repeat('?,', count($columns));
        return substr($symbols, 0, strlen($symbols) - 1);
    }
}
