<?php

namespace App\Transformers;

use App\Util\UserRoleEnum;
use App\Util\UserStatusEnum;
use League\Fractal\TransformerAbstract;
use App\Entities\User;

/**
 * Class UserTransformer.
 *
 * @package namespace App\Transformers;
 */
class UserTransformer extends TransformerAbstract
{
    /**
     * Transform the User entity.
     *
     * @param \App\Entities\User $model
     *
     * @return array
     */
    public function transform(User $model)
    {
        return [
            'id'         => (int) $model->id,
            'name'       => $model->name,
            'email'      => $model->email,
            'status'     => UserStatusEnum::getName($model->status),
            'role'       => $model->role ?? 'public',
            /* place your other model properties here */

            'created_at' => $model->created_at->format('d/m/Y'),
            'updated_at' => $model->updated_at->toDateTimeString()
        ];
    }
}
