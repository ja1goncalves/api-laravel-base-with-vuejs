<?php

namespace App\Transformers;

use League\Fractal\TransformerAbstract;
use App\Entities\Categories;

/**
 * Class CategoriesTransformer.
 *
 * @package namespace App\Transformers;
 */
class CategoriesTransformer extends TransformerAbstract
{
    /**
     * Transform the Categories entity.
     *
     * @param \App\Entities\Categories $model
     *
     * @return array
     */
    public function transform(Categories $model)
    {
        return [
            'id'         => (int) $model->id,
            'name'       => $model->name,
            'created_by' => $model['createdBy'],
            'updated_by' => $model['updatedBy'],

            /* place your other model properties here */

            'created_at' => $model->created_at->format('d/m/Y'),
            'updated_at' => $model->updated_at->toDateTimeString()
        ];
    }
}
