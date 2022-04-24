<?php

namespace Engine\Database;

use Engine\ErrorHandler\ErrorHandler;
use Engine\Http\StatusCodes;

use PDO;
use PDOStatement;

/**
 * That Class is helper which is configuration of the PDO object and is used to connect to Database server.
 */
class Adapter
{
    /**
     * PDO object
     * @var PDO|null
     */
    private ?PDO $_db = null;

    /**
     * PDO Statement
     * @var PDOStatement|null
     */
    private ?PDOStatement $_stmt = null;

    /**
     * SQL Parameters
     * @var array
     */
    private array $_params = [];

    public function __construct(\PDO $pdo)
    {
        $this->_db = $pdo;
    }

    /**
     * Send the query string to the database server
     * @param string $sql The sql query which need to send
     * @param array $params All parameters which is need to set on the sql query
     * @param array $pdoOptions Some PDO options (Read on documentation)
     * @return Adapter
     */
    public function prepare(string $sql, array $params = [], array $pdoOptions = []) : Adapter
    {
        $this->_stmt = $this->_db->prepare($sql, $pdoOptions);
        $this->_params = $params;
        return $this;
    }

    /**
     * Get the parameters which is used on current sql query
     * @return array All parameters which is set for sql query
     */
    public function getParams() : array
    {
        return $this->_params;
    }

    /**
     * Set new parameters for to used on current sql query
     * @param array $params All parameters which will used for sql query
     * @return Adapter
     */
    public function setParams(array $params) : Adapter
    {
        $this->_params = $params;
        return $this;
    }

    /**
     * Execute the prepared query on database
     * @param array $params All parameters which will used for sql query
     * @return Adapter
     */
    public function execute(array $params = []) : Adapter
    {
        $this->_params = $params ?: [];

        try {
            $this->_stmt->execute($this->_params);
        } catch (\PDOException $e) {
            new ErrorHandler(
                StatusCodes::INTERNAL_SERVER_ERROR,
                $e->getMessage()
            );
        }

        return $this;
    }

    /**
     * Get list of records from database
     * @return array List of all records found for that Mysql Query
     */
    public function fetchAllAssoc()
    {
        return $this->_stmt->fetchAll(\PDO::FETCH_ASSOC);
    }

    /**
     * Get only first found record from database
     * @return array Associative array with one record. The keys is the name of columns
     */
    public function fetchRowAssoc()
    {
        return $this->_stmt->fetch(\PDO::FETCH_ASSOC);
    }

    /**
     * Get the id of last inserted record
     * @return int Last inserted id
     */
    public function getLastInsertId()
    {
        return $this->_db->lastInsertId();
    }

    /**
     * Get count of affected rows on table
     * @return int count of affected rows
     */
    public function getAffectedRows()
    {
        return $this->_stmt->rowCount();
    }
}
