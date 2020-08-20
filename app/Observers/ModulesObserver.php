<?php

namespace App\Observers;

use App\Entities\Modules;
use App\Repositories\ModulesRepository;
use App\Repositories\UserRepository;
use App\Repositories\UsersModulesRepository;

class ModulesObserver
{
    /**
     * @var UserRepository
     */
    protected $userRepository;

    /**
     * @var UsersModulesRepository
     */
    protected $usersModulesRepository;

    /**
     * UserObserver constructor.
     * @param UsersModulesRepository $usersModulesRepository
     * @param UserRepository $userRepository
     */
    public function __construct(UsersModulesRepository $usersModulesRepository,
                                UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
        $this->usersModulesRepository = $usersModulesRepository;
    }

    public function created(Modules $module)
    {
        $users = $this->userRepository->all('id');
        foreach ($users as $user) {
            $user_module = [
                'user_id' => $user->id,
                'module_id' => $module->getAttribute('id'),
                'auth' => $user->id == 1,
            ];
            $this->usersModulesRepository->create($user_module);
        }
    }
}
