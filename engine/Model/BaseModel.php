<?php

namespace Engine\Model;

/**
 *
 * @package Engine\Model
 */
class BaseModel extends DbModel
{
    protected $_is_valid = false;

    public function __construct($table)
    {
        parent::__construct($table);
    }

    public function _get($params)
    {
        if (empty($params)) {
            return $this->_query->prepare()->get()->fetchRowAssoc();
        }

        return $this->_query->prepare()->setParams($params)->get()->fetchRowAssoc();
    }

    public function _all($params)
    {
        if (empty($params)) {
            return $this->_query->prepare()->get()->fetchAllAssoc();
        }

        return $this->_query->prepare()->setParams($params)->get()->fetchAllAssoc();
    }
}
