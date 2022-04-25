<?php

namespace Engine\Database;

class Database
{
    /**
     * @var Database|null
     */
    private static ?Database $_instance;

    /**
     * @var IQuery|null
     */
    private ?IQuery $_db;

    private function __construct() { }

    public static function getInstance() : Database
    {
        if (Database::$_instance === null) {
            Database::$_instance = new Database();
        }

        return Database::$_instance;
    }

    public function setEngine(string $engine) : void
    {
        if ($engine === 'mysql') {
            $this->_db = new MySqlQuery();
        } else if ($engine === 'postgres') {
            $this->_db = new PostgresQuery();
        }
    }

    /**
     * Set the Instance to class which is Database Connector
     * @param Adapter $adapter Database Connector Interface
     */
    public function setAdapter(Adapter $adapter) : void
    {
        $this->_db->setAdapter($adapter);
    }

    public function db() : IQuery
    {
        return $this->_db;
    }
}
