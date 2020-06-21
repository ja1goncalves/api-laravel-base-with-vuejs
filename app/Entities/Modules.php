<?php

namespace App\Entities;

use App\Observers\ModulesObserver;
use Prettus\Repository\Contracts\Transformable;
use Prettus\Repository\Traits\TransformableTrait;

/**
 * Class Modules.
 *
 * @package namespace App\Entities;
 */
class Modules extends AppModel implements Transformable
{
    use TransformableTrait;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['name', 'icon', 'route', 'status'];

    public function usersModules()
    {
        return $this->hasMany(UsersModules::class, 'module_id', 'id');
    }

    public static function boot()
    {
        parent::boot();
        ModulesObserver::observe(ModulesObserver::class);
    }
}
