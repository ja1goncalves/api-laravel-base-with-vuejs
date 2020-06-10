<?php


namespace App\Util;


class UserRoleEnum
{
    public const ADMIN = 'admin';
    public const EDITOR = 'editor';
    public const PUBLIC = 'public';

    private const ROLES = [
        self::ADMIN => 'Administrador',
        self::EDITOR => 'Editor',
        self::PUBLIC => 'Público'
    ];

    public static function getUserRoles(string $role): string
    {
        return array_key_exists($role, self::ROLES)
            ? self::ROLES[$role]
            : 'Público';
    }
}
