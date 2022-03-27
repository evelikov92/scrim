<?php

namespace Engine\Database;

/**
 * That Interface is to help to create class who need to connect to Database Server
 * @package Engine\Database
 */
interface IAdapter
{
    /**
     * Send the query string to the database server
     * @param string $sql The sql query which need to send
     * @param array $params All parameters which is need to set on the sql query
     * @param array $pdoOptions Some PDO options (Read on documentation)
     * @return mixed
     */
    public function prepare($sql, $params = [], $pdoOptions = []);

    /**
     * Get the parameters which is used on current sql query
     * @return array All parameters which is set for sql query
     */
    public function getParams();

    /**
     * Set new parameters for to used on current sql query
     * @param array $params All parameters which will used for sql query
     * @return mixed
     */
    public function setParams($params);

    /**
     * Execute the prepared query on database
     * @param array $params All parameters which will used for sql query
     * @return mixed
     */
    public function execute($params = []);

    /**
     * Get list of records from database
     * @return array List of all records found for that Mysql Query
     */
    public function fetchAllAssoc();

    /**
     * Get only first found record from database
     * @return array Associative array with one record. The keys is the name of columns
     */
    public function fetchRowAssoc();

    /**
     * Get the id of last inserted record
     * @return int Last inserted id
     */
    public function getLastInsertId();
}