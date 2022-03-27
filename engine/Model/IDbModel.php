<?php

namespace Engine\Model;

/**
 *
 * @package Engine\Model
 */
interface IDbModel
{
    /**
     * Get the element from the database
     * @param int $id The id of the record
     * @param null|array|string $columns Columns which need to get from database
     * @return array Element from database
     */
    public function get($id, $columns = null);

    /**
     * Get all records from database
     * @param int $page The page of the request
     * @param int $itemsPerPage How many records will get from database
     * @param null $columns Columns which need to get from database
     * @return array Elements from database
     */
    public function all($page = 1, $itemsPerPage = 10, $columns = null);

    /**
     * Add record on database
     * @param array $columns Columns which need to add as record
     */
    public function add($columns);

    /**
     * Add many records on database
     * @param array $records Many records to add on database
     * @return array All new saved records on database
     */
    public function addMany($records);

    /**
     *
     * @param $condition
     * @param int $page
     * @param int $itemsPerPage
     * @param null $columns
     * @return mixed
     */
    public function where($condition, $page = 1, $itemsPerPage = 10, $columns = null);

    /**
     *
     * @param $condition
     * @param int $page
     * @param int $itemsPerPage
     * @param null $columns
     * @return mixed
     */
    public function orWhere($condition, $page = 1, $itemsPerPage = 10, $columns = null);

    /**
     *
     * @param $condition
     * @param int $page
     * @param int $itemsPerPage
     * @param null $columns
     * @return mixed
     */
    public function andWhere($condition, $page = 1, $itemsPerPage = 10, $columns = null);

    /**
     * Set is_deleted flag of the record on database
     * @param int $id The id of the record
     */
    public function remove($id);

    /**
     * Update record on database
     * @param int $id The id of the records
     * @param array $columns Associative array with key => value ==> column_name => new_value
     */
    public function update($id, $columns);

    /**
     * @param array $records Many records which will update on database
     * @return array All new updated records from database
     */
    public function updateMany($records);

    /**
     * Make the join with another one table on sql
     * @param string $table The name of the table for join
     * @param string $join Kind of sql join
     */
    public function width($table, $join);
}
