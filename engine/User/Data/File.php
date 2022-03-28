<?php

namespace Engine\User\Data;
use Engine\Config;
use Engine\Types\Text;

/**
 * TODO is not secure because use $_FILES
 * That Class is responsible to save uploaded files to the server safely
 * @package Engine\User\Data
 */
class File
{
    /**
     * Save uploaded file on server
     * @param string $folder Folder name which need to be uploaded
     * @param string $key Request input parameter attribute
     * @return string|null Full path to the file
     */
    public static function save($folder, $key)
    {
        $allowed = [ 'jpg', 'JPG', 'png', 'PNG', 'jpeg', 'JPEG', 'avi', 'AVI', 'mp4', 'MP4', 'pdf', 'PDF' ];
        $ext = pathinfo($_FILES[$key]['name'], PATHINFO_EXTENSION);

        // Check do file is possible to be uploaded. Do is on our rules for file
        if (!empty($_FILES[$key]['name']) && in_array($ext, $allowed) &&
            strpos($_FILES[$key]['name'], 'php') === FALSE &&
            strpos($_FILES[$key]['name'], 'phtml') === FALSE) {

            $filePath = $folder . DIRECTORY_SEPARATOR . self::_generateFileName($_FILES[$key]['name'], $ext);
            $target = Config::getInstance()->get('app', 'public_folder') . "$filePath";
            move_uploaded_file($_FILES[$key]['tmp_name'], $target);

            return $filePath;
        }

        return '';
    }

    /**
     * Generate random name for new uploaded file
     * @param string $name Name of uploaded file
     * @param string $ext Extension of uploaded file
     * @return string The new name of the uploaded file
     */
    private static function _generateFileName($name, $ext)
    {
        $rnd = Text::genRandString(12);
        $name = $rnd . '_' . $name . '-' . time();
        return hash('sha256', hash('sha256', hash('sha256', $name))) . '.' . $ext;
    }
}
