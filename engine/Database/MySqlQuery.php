<?php

namespace Engine\Database;

use Engine\ErrorHandler\ErrorHandler;
use Engine\Http\StatusCodes;

/**
 * Query Builder for easy way to create MySQL queries
 * @author Evgeni Velikov
 */
class MySqlQuery implements IQuery
{
    /**
     * Creator of sql queries and connect to database
     * @var \Engine\Database\MySqlQuery
     */
    private static $_instance = null;

    /**
     * where clause for sql query
     * @var string
     */
    private $_where = null;

    /**
     * select clause for sql query
     * @var string
     */
    private $_select = null;

    /**
     * from clause for sql query
     * @var string
     */
    private $_from = null;

    /**
     * order by clause for sql query
     * @var string
     */
    private $_orderBy = null;

    /**
     * group by clause for sql query
     * @var string
     */
    private $_groupBy = null;

    /**
     * limit clause for sql query
     * @var string
     */
    private $_limit = null;

    /**
     * skip clause for sql query
     * @var string
     */
    private $_skip = null;

    /**
     * join clause for sql query
     * @var string
     */
    private $_join = null;

    /**
     * insert clause for sql query
     * @var string
     */
    private $_insert = null;

    /**
     * delete clause for sql query
     * @var string
     */
    private $_delete = null;

    /**
     * update clause for sql query
     * @var string
     */
    private $_update = null;

    /**
     * finally sql query builder
     * @var string
     */
    private $_command = null;

    /**
     * what table is select on database
     * @var string
     */
    private $_table = null;

    /**
     * what kind of command is used for create sql query
     * @var string
     */
    private $_option = null;

    /**
     * Database Connector Interface
     * @var \Engine\Database\IAdapter
     */
    private $_db = null;

    /**
     * All parameters which user is set for sql query
     * @var array
     */
    private $_params = [];

    /**
     * Set the Instance to class which is Database Connector
     * @param \Engine\Database\IAdapter $adapter Database Connector Interface
     */
    public function setAdapter(IAdapter $adapter)
    {
        $this->_db = $adapter;
    }

    /**
     * Set the name of database table
     * @param string $table the name of database table
     * @return \Engine\Database\MySqlQuery Creator of sql queries and connect to database
     */
    public function table($table)
    {
        if (!is_string($table)) {
            new ErrorHandler(
                StatusCodes::$_INTERNAL_SERVER_ERROR,
                'The $table variable is required to be string'
            );
        }

        $this->_from = " FROM `$table`";
        $this->_table = $table;
        return $this;
    }

    /**
     * Select clause of sql query which select the columns (properties) of records
     * @param string|array $columns all selected columns from table (string or array)
     * @return \Engine\Database\MySqlQuery Creator of sql queries and connect to database
     */
    public function select($columns = "*")
    {
        if (is_array($columns)) {
            $this->_select = 'SELECT ' . implode(', ', $columns);
        } else if(!empty($columns)) {
            $this->_select = "SELECT $columns";
        } else {
            new ErrorHandler(
                StatusCodes::$_INTERNAL_SERVER_ERROR,
                'The $columns variable is required to be string|array'
            );
        }

        $this->_option = 'select';
        return $this;
    }

    /**
     * Insert clause on sql query which is create to add new record on database
     * @param array $columns all columns which is to add on database
     * @return \Engine\Database\MySqlQuery Creator of sql queries and connect to database
     */
    public function add($columns)
    {
        $values = $this->_returnSymbolParamsCount($columns);
        if (empty($columns)) {
            new ErrorHandler(
                StatusCodes::$_INTERNAL_SERVER_ERROR,
                'The $columns variable is required to be array!'
            );
        }

        $this->_insert = "INSERT INTO `$this->_table` ( " . implode(", ",  $columns) . " ) VALUES ( $values )";
        $this->_option = 'insert';
        return $this;
    }

    /**
     * Update clause on sql query which is update current record on database
     * @param array $columns all columns which is update on database
     * @return \Engine\Database\MySqlQuery Creator of sql queries and connect to database
     */
    public function update($columns)
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
                StatusCodes::$_INTERNAL_SERVER_ERROR,
                'The $columns variable is required to be array!'
            );
        }

        return $this;
    }

    /**
     * Delete clause on sql query which is delete record from database
     * @return \Engine\Database\MySqlQuery Creator of sql queries and connect to database
     */
    public function delete()
    {
        if (!$this->_table) {
            new ErrorHandler(
                StatusCodes::$_INTERNAL_SERVER_ERROR,
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
     * @return \Engine\Database\MySqlQuery Creator of sql queries and connect to database
     */
    public function join($table, $equal, $type = 'INNER')
    {
        if ($table && $equal){
            $this->_join .= " $type JOIN $table ON $equal";
        } else {
            new ErrorHandler(
                StatusCodes::$_INTERNAL_SERVER_ERROR,
                'The $table and $equal variable are required!'
            );
        }

        return $this;
    }

    /**
     * Where clause on sql query which is check do column is some equal with param
     * @param string $column Column from database table to check do is some equal with param
     * @param string $param Value to check do column from database table is some equal with value
     * @param string $operator operator for comparison the column and parameter
     * @return \Engine\Database\MySqlQuery Creator of sql queries and connect to database
     */
    public function where($column, $param = null, $operator = '=')
    {
        if (is_string($column) && is_string($operator)) {
            $this->_where = ' WHERE ' . $column . str_replace('"', '', $operator) . ' ?';
            if ($param !== null) {
                $this->_params[$column] = $param;
            }
        } else {
            new ErrorHandler(
                StatusCodes::$_INTERNAL_SERVER_ERROR,
                'We need to have $column variable like string!'
            );
        }

        return $this;
    }

    /**
     * If is used the where clause then that is next where clause if is need both to be true
     * @param string $column Column from database table to check do is some equal with param
     * @param string $param Value to check do column from database table is some equal with value
     * @param string $operator operator for comparison the column and parameter
     * @return \Engine\Database\MySqlQuery Creator of sql queries and connect to database
     */
    public function andWhere($column, $param = null, $operator = '=')
    {
        if (empty($this->_where)) {
            new ErrorHandler(
                StatusCodes::$_INTERNAL_SERVER_ERROR,
                'Please first use WHERE method!'
            );
        }
        if (is_string($column) && is_string($operator)) {
            $this->_where .= ' AND ' . $column . str_replace('"', '', $operator) . ' ?';
            if ($param !== null) {
                $this->_params[$column] = $param;
            }
        } else {
            new ErrorHandler(
                StatusCodes::$_INTERNAL_SERVER_ERROR,
                'We need to have $column variable like string!'
            );
        }

        return $this;
    }

    /**
     * If is used the where clause then that is next where clause if is need one or both to be true
     * @param string $column Column from database table to check do is some equal with param
     * @param string $param Value to check do column from database table is some equal with value
     * @param string $operator Operator for comparison the column and parameter
     * @return \Engine\Database\MySqlQuery Creator of sql queries and connect to database
     */
    public function orWhere($column, $param = null, $operator = '=')
    {
        if (empty($this->_where)) {
            new ErrorHandler(
                StatusCodes::$_INTERNAL_SERVER_ERROR,
                'Please first use WHERE method!'
            );
        }
        if (is_string($column) && is_string($operator)) {
            $this->_where .= ' OR ' . $column . str_replace('"', '', $operator) . ' ?';
            if ($param !== null) {
                $this->_params[$column] = $param;
            }
        } else {
            new ErrorHandler(
                StatusCodes::$_INTERNAL_SERVER_ERROR,
                'We need to have $column variable like string!'
            );
        }

        return $this;
    }

    /**
     * Where find all records which the column is null
     * @param string $column Column on table which is to check do is null
     * @return \Engine\Database\MySqlQuery Creator of sql queries and connect to database
     */
    public function whereNull($column)
    {
        if (!is_string($column)) {
            new ErrorHandler(
                StatusCodes::$_INTERNAL_SERVER_ERROR,
                'We need to have $column variable like string!'
            );
        }

        if (!empty($this->_where)) {
            $this->_where .= " AND $column is null";
        } else {
            $this->_where = " WHERE $column is null";
        }

        return $this;
    }

    /**
     * Where find all records which the column is NOT null
     * @param string $column Column on table which is to check do is NOT null
     * @return \Engine\Database\MySqlQuery Creator of sql queries and connect to database
     */
    public function whereNotNull($column)
    {
        if (!is_string($column)) {
            new ErrorHandler(
                StatusCodes::$_INTERNAL_SERVER_ERROR,
                'We need to have $column variable like string!'
            );
        }

        if (!empty($this->_where)) {
            $this->_where .= " AND $column is not null";
        } else {
            $this->_where = " WHERE $column is not null";
        }

        return $this;
    }

    /**
     * Where find all records which is like between set parameters
     * @param string $column Column on table which is to check do is have record between that params
     * @param array $params Values to check do have records between that params
     * @return \Engine\Database\MySqlQuery Creator of sql queries and connect to database
     */
    public function whereBetween($column, $params = [])
    {
        if (!is_string($column)) {
            new ErrorHandler(
                StatusCodes::$_INTERNAL_SERVER_ERROR,
                'We need to have $column variable like string!'
            );
        }

        if (!empty($this->_where)) {
            $this->_where .= " AND $column BETWEEN ? AND ? ";
        } else {
            $this->_where = " WHERE $column BETWEEN ? AND ? ";
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
     * @return \Engine\Database\MySqlQuery Creator of sql queries and connect to database
     */
    public function whereNotBetween($column, $params = [])
    {
        if (!is_string($column)) {
            new ErrorHandler(
                StatusCodes::$_INTERNAL_SERVER_ERROR,
                'We need to have $column variable like string!'
            );
        }

        if (!empty($this->_where)) {
            $this->_where .= " AND $column NOT BETWEEN ? AND ? ";
        } else {
            $this->_where = " WHERE $column NOT BETWEEN ? AND ? ";
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
     * @return \Engine\Database\MySqlQuery Creator of sql queries and connect to database
     */
    public function whereIn($column, $params = [])
    {
        if (!is_string($column)) {
            new ErrorHandler(
                StatusCodes::$_INTERNAL_SERVER_ERROR,
                'We need to have $column and $params like string and array'
            );
        }

        $symbols = $this->_returnSymbolParamsCount($params);
        if (!empty($this->_where)) {
            $this->_where .= " AND $column IN ( $symbols )";
        } else {
            $this->_where = " WHERE $column IN ( $symbols )";
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
     * @return \Engine\Database\MySqlQuery Creator of sql queries and connect to database
     */
    public function whereNotIn($column, $params = [])
    {
        if (!is_string($column)) {
            new ErrorHandler(
                StatusCodes::$_INTERNAL_SERVER_ERROR,
                'We need to have $column and $params like string and array'
            );
        }

        $symbol = $this->_returnSymbolParamsCount($params);
        if (!empty($this->_where)) {
            $this->_where .= " AND $column NOT IN ( $symbol )";
        } else {
            $this->_where = " WHERE $column NOT IN ( $symbol )";
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
     * @return \Engine\Database\MySqlQuery Creator of sql queries and connect to database
     */
    public function whereDate($column, $dateType, $date, $operator = '=')
    {
        if (is_string($column) && isset($date) && is_string($operator)) {
            if (!empty($this->_where)){
                $this->_where .= " AND $dateType ( $column } $operator ? ";
            } else {
                $this->_where = " WHERE $dateType ( $column } $operator ? ";
            }
            array_push($this->_params, $date);
        } else {
            new ErrorHandler(
                StatusCodes::$_INTERNAL_SERVER_ERROR,
                'The $column is need to be a string and $date is required!'
            );
        }

        return $this;
    }

    /**
     * Where column is first column of record to be equal of second column of record
     * @param string $first first column of record
     * @param string $second second column of record
     * @param string $operator operator for comparison the first and second column
     * @return \Engine\Database\MySqlQuery Creator of sql queries and connect to database
     */
    public function whereColumn($first, $second, $operator = '=')
    {
        if (is_string($first) && is_string($second) && is_string($operator)) {
            if (!empty($this->_where)) {
                $this->_where .= " AND $first $operator $second";
            } else {
                $this->_where = " WHERE $first $operator $second";
            }
        } else {
            new ErrorHandler(
                StatusCodes::$_INTERNAL_SERVER_ERROR,
                'The $first and $second is need to be a string!'
            );
        }

        return $this;
    }

    /**
     * Take clause on sql query which is set how many records to take from database table
     * @param integer $limit how many items to take
     * @return \Engine\Database\MySqlQuery Creator of sql queries and connect to database
     */
    public function take($limit)
    {
        if (!is_int($limit)) {
            new ErrorHandler(
                StatusCodes::$_INTERNAL_SERVER_ERROR,
                'The $limit variable is not a integer!'
            );
        }

        $this->_limit = " LIMIT $limit";
        return $this;
    }

    /**
     * Skip clause on sql query which is set how many records to skip from database table
     * @param integer $number how many items to skip
     * @return \Engine\Database\MySqlQuery Creator of sql queries and connect to database
     */
    public function skip($number)
    {
        if (!is_int($number)) {
            new ErrorHandler(
                StatusCodes::$_INTERNAL_SERVER_ERROR,
                'The $number is need to be integer!'
            );
        }

        $this->_skip = " OFFSET $number";
        return $this;
    }

    /**
     * Order clause on sql query which is order by one column
     * @param string $column the column on table with which is to be ordered
     * @param boolean $isDesc do is desc or asc
     * @return \Engine\Database\MySqlQuery Creator of sql queries and connect to database
     */
    public function orderBy($column, $isDesc = false)
    {
        if (!is_string($column)) {
            new ErrorHandler(
                StatusCodes::$_INTERNAL_SERVER_ERROR,
                'The $column variable is required to be string!'
            );
        }

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
     * @param boolean $isDesc do is desc or asc
     * @return \Engine\Database\MySqlQuery Creator of sql queries and connect to database
     */
    public function groupBy($column, $isDesc = false)
    {
        if (!is_string($column)) {
            new ErrorHandler(
                StatusCodes::$_INTERNAL_SERVER_ERROR,
                'The $column variable is need to be string!'
            );
        }

        $this->_groupBy = " GROUP BY $column ";
        if ($isDesc) {
            $this->_groupBy .= ' DESC ';
        }

        return $this;
    }

    /**
     * Set parameters for created sql query
     * @param array $values SQL query parameters only values
     * @return \Engine\Database\MySqlQuery Creator of sql queries and connect to database
     */
    public function setParams($values = [])
    {
        $count = count($values);
        if (!$count) {
            new ErrorHandler(
                StatusCodes::$_INTERNAL_SERVER_ERROR,
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
    public function getParams()
    {
        return $this->_params;
    }

    /**
     * Prepare the sql query and set what kind of query is will used
     * @return \Engine\Database\MySqlQuery Creator of sql queries and connect to database
     */
    public function prepare()
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

        $this->_option = null;
        $this->_select = null;
        $this->_from = null;
        $this->_join = null;
        $this->_groupBy = null;
        $this->_where = null;
        $this->_orderBy = null;
        $this->_limit = null;
        $this->_skip = null;
        $this->_insert = null;
        $this->_update = null;
        $this->_delete = null;

        return $this;
    }

    /**
     * Get the result from created sql query
     * @return \Engine\Database\Adapter sql query result
     */
    public function get()
    {
        $this->_db->setParams(array_values($this->_params));
        $this->_params = [];
        return $this->_db->execute();
    }

    /**
     * Execute the created sql query
     */
    public function execute()
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
    public function getCommand()
    {
        return $this->_command;
    }

    /**
     * Set Your own sql query
     * @param string $command sql query
     * @return \Engine\Database\MySqlQuery Creator of sql queries and connect to database
     */
    public function setCommand($command)
    {
        if (!is_string($command)) {
            new ErrorHandler(
                StatusCodes::$_INTERNAL_SERVER_ERROR,
                'The command is need to be string!'
            );
        }

        $this->_command = $command;
        return $this;
    }

    /**
     * Get or create new QBuilder object
     * @return \Engine\Database\MySqlQuery Creator of sql queries and connect to database
     */
    public static function getInstance()
    {
        if (self::$_instance === null) {
            self::$_instance = new MySqlQuery();
        }
        return self::$_instance;
    }

    /**
     * Generate ? symbol for sql query for every parameter
     * @param array $columns list of all parameters on sql query
     * @return string correct syntax for query builder of parameters
     */
    private function _returnSymbolParamsCount ($columns)
    {
        $symbols = str_repeat('?,', count($columns));
        return substr($symbols, 0, strlen($symbols) - 1);
    }
}
