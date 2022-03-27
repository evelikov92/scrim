<?php

namespace Engine\Model;

use Engine\Common;
use Engine\Database\MySqlQuery;
use Engine\Model\Relations\RelationModel;

/**
 * Class BaseModel
 * @package Engine\Model
 */
abstract class DbModel extends RelationModel implements IDbModel
{
    protected $_query = null;

    protected $_table = null;

    protected $_is_deleted = false;

    protected $_created_at = null;

    protected $_updated_at = null;

    protected function __construct($table)
    {
        $this->_query = MySqlQuery::getInstance();
        $this->_table = $table;
    }

    public function get($id, $columns = null)
    {
        // TODO: Implement get() method.
        return $this;
    }

    public function all($page = 1, $itemsPerPage = 10, $columns = null)
    {
        // TODO: Implement all() method.
        return $this;
    }

    public function width($table, $join)
    {
        return $this;
    }

    public function order($column, $desc)
    {
        return $this;
    }

    /**
     * @param $condition
     * @param int $page
     * @param int $itemsPerPage
     * @param null $columns
     * @return array|mixed
     */
    public function where($condition, $page = 1, $itemsPerPage = 10, $columns = null)
    {
        list($column, $operator, $param) = $condition;
        $skip = (int)($page * $itemsPerPage - $itemsPerPage);

        return $this->_query->select($columns)->table($this->_table)
            ->where($column, $param, $operator)
            ->take((int)$itemsPerPage)->skip($skip)
            ->prepare()->get()->fetchAllAssoc();
    }

    public function orWhere($condition, $page = 1, $itemsPerPage = 10, $columns = null)
    {
        // TODO: Implement orWhere() method.
    }

    public function andWhere($condition, $page = 1, $itemsPerPage = 10, $columns = null)
    {
        // TODO: Implement andWhere() method.
    }

    public function remove($id)
    {
        // TODO: Implement remove() method.
    }

    public function update($id, $columns)
    {
        // Validate every column

        // Update the record
        $columns['updated_at'] = Common::convertToDate();
        $this->_query->table($this->_table)->update(array_keys($columns))->where('id')
            ->prepare()->setParams(array_merge( array_values($columns), [ 'id' => $id ] ))->execute();
    }

    public function updateMany($records)
    {
        if (empty($records) || !isset($records[0])) {
            return;
        }

//        for ($i = 0, $len = count($records); $i < $len; ++$i) {
//            $this->_query->table($this->_table)->update()
//        }
    }

    public function add($columns)
    {
        // Validate every column

        // Add record on database
        $columns['updated_at'] = Common::convertToDate();
        $columns['created_at'] = Common::convertToDate();

        $columns['id'] = $this->_query->table($this->_table)
            ->add(array_keys($columns))
            ->prepare()->setParams(array_values($columns))->get()->getLastInsertId();

        // Return the inserted record
        return $columns;
    }

    /**
     * @param array $records
     * @return array
     */
    public function addMany($records)
    {
        if (empty($records) || !isset($records[0])) {
            return null;
        }

        $this->_query->table($this->_table)->add(array_keys($records[0]))->prepare();
        for ($i = 0, $len = count($records); $i < $len; ++$i) {
            $records[$i]['id'] = $this->_query->setParams(array_values($records[0]))->get()->getLastInsertId();
        }

        return $records;
    }

    private function _getAllFields($columns)
    {
        $newColumns = [];
        for ($i = 0, $len = count($columns); $i < $len; ++$i) {
            if (strpos($columns[$i], '.') === FALSE) { // Is for major

            } else {

            }
        }
    }
}
