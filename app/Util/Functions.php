<?php


namespace App\Util;


use Carbon\Carbon;

final class Functions
{
    public const FORMAT_DATE = "[0-9]{2}/[0-9]{2}/[0-9]{4}";
    public const FORMAT_DATE_BR = "d/m/Y";
    public const FORMAT_DATE_US = "Y-m-d";
    public const DATES_TIME = ['created_at', 'updated_at', 'deleted_at', 'start_at', 'end_at'];

    public static function convertDateToUS($date, $invert = false)
    {
        if ($invert)
            return Carbon::createFromFormat(self::FORMAT_DATE_US, $date)->format(self::FORMAT_DATE_BR);
        else
            return Carbon::createFromFormat(self::FORMAT_DATE_BR, $date)->format(self::FORMAT_DATE_US);
    }

    public static function getWeekendDays()
    {
        $inFriday = Carbon::now()->isFriday();
        $inSaturday = $inFriday || Carbon::now()->isSaturday();
        $inSunday = $inSaturday || Carbon::now()->isSunday();

        return [
            'friday' => (new Carbon($inFriday ? 'last' : 'first' . ' friday this week'))->format('Y-m-d'),
            'saturday' => (new Carbon($inSaturday ? 'last' : 'first' . ' saturday this week'))->format('Y-m-d'),
            'sunday' => (new Carbon($inSunday ? 'last' : 'first' . ' sunday this week'))->format('Y-m-d'),
        ];
    }
}
