<?php
/**
 * Created by PhpStorm.
 * User: Evgeni Velikov
 * Date: 12/3/2018
 * Time: 1:11 PM
 */

namespace Engine\Model\Relations;

abstract class RelationModel implements IRelationModel
{


    /**
     * Implement Many to Many database table relations
     * @param string $table The table to which is set record
     * @param null|string $foreignKey By default will be $table_id
     */
    public function manyToMany($table, $foreignKey = null)
    {
        $key = $this->_setForeignKey($foreignKey);
    }

    /**
     * Implement Many to One database table relations
     * @param string $table The table from which is make the foreign key
     * @param string $join What kind of Join will use for that chain
     * @param null|string $foreignKey By default will be $table_id
     */
    public function manyToOne($table, $join = 'INNER', $foreignKey = null)
    {
        $key = $this->_setForeignKey($foreignKey);

    }

    /**
     * Implement One to Many database table relations
     * @param string $table The table to which is have foreign key
     * @param null|string $foreignKey By default will be $table_id
     */
    public function oneToMany($table, $foreignKey = null)
    {
        $key = $this->_setForeignKey($foreignKey);
    }

    /**
     * @param null|string $key
     * @return string
     */
    private function _setForeignKey($key = null)
    {
        if (!$key) {
            return $this->{'_table'} . '_id';
        }

        return $key;
    }
}
