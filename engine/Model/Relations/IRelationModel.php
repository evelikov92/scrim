<?php

namespace Engine\Model\Relations;

/**
 *
 * @package Engine\Model
 */
interface IRelationModel
{
    /**
     * Implement Many to Many database table relations
     * @param string $table The table to which is set record
     * @param null|string $foreignKey By default will be $table_id
     */
    public function manyToMany($table, $foreignKey = null);

    /**
     * Implement One to Many database table relations
     * @param string $table The table to which is have foreign key
     * @param null|string $foreignKey By default will be $table_id
     */
    public function oneToMany($table, $foreignKey = null);

    /**
     * Implement Many to One database table relations
     * @param string $table The table from which is make the foreign key
     * @param string $join What kind of Join will use for that chain
     * @param null|string $foreignKey By default will be $table_id
     */
    public function manyToOne($table, $join = 'INNER', $foreignKey = null);
}
