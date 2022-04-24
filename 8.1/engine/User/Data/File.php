<?php

namespace Engine\User\Data;

use Engine\Common;
use Engine\Config;

/**
 * That Class is responsible to save uploaded files to the server safely
 */
class File
{
    /**
     * Save uploaded file on server
     * @param string $folder Folder name which need to be uploaded
     * @param string $key Request input parameter attribute
     * @return string|null Full path to the file
     */
    public static function save(string $folder, string $key) : ?string
    {
        $allowed = [ 'jpg', 'JPG', 'png', 'PNG', 'jpeg', 'JPEG', 'avi', 'AVI', 'mp4', 'MP4', 'pdf', 'PDF' ];
        $ext = pathinfo($_FILES[$key]['name'], PATHINFO_EXTENSION);

        // Check do file is possible to be uploaded. Do is on our rules for file
        if (!empty($_FILES[$key]['name']) && in_array($ext, $allowed) &&
            !str_contains($_FILES[$key]['name'], 'php') &&
            !str_contains($_FILES[$key]['name'], 'phtml')) {

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
    private static function _generateFileName(string $name, string $ext) : string
    {
        $rnd = Common::genRandString(12);
        $name = $rnd . '_' . $name . '-' . time();
        return hash('sha256', hash('sha256', hash('sha256', $name))) . '.' . $ext;
    }
}
