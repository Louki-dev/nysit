<?php

namespace core\misc;


class Utilities extends \Exception
{

	public static function dd()
	{
		$output = array();

		foreach (func_get_args() as $arg) {
			array_push($output, $arg);
		}

		die(json_encode($output, JSON_PRETTY_PRINT));
	}

	public static function randomizer($length, $type = Defaults::RAND_ALPHA_NUMERIC, $repeat = false)
	{
		$types = [
			Defaults::RAND_ALPHA_NUMERIC => implode('', array_merge(range('a', 'z'), range('A', 'Z'), range(0, 9))),
			Defaults::RAND_ALPHA => implode('', array_merge(range('a', 'z'), range('A', 'Z'))),
			Defaults::RAND_NUMERIC => implode('', range(0, 9)),
		];
		$chars = $types[$type];
		$max = strlen($chars) - 1;

		if (($repeat && $length > $max + 1) || $length < 0) {
			return self::responseWithException("Non repetitive random string can't be longer than charset");
		}

		$rand_chars = array();

		while ($length) {
			$picked = $chars[mt_rand(0, $max)];

			if ($repeat) {
				if (!array_key_exists($picked, $rand_chars)) {
					$rand_chars[$picked] = true;
					$length--;
				}
			} else {
				$rand_chars[] = $picked;
				$length--;
			}
		}

		return implode('', $repeat ? array_keys($rand_chars) : $rand_chars);
	}

	public static function response($status, $error = null, $content = null, $additional = [])
	{
		ob_end_flush();

		if (ob_get_contents()) ob_end_clean();

		die(json_encode([
			"status" => $status,
			"error" => $error,
			"content" => $content,
			"additional" => $additional
		], JSON_PRETTY_PRINT));
	}

	public static function responseWithException($error)
	{
		$error = is_object($error) ? $error : new \Exception($error);
		throw self::response(false, ['error' => $error->getMessage()], null);
	}

	public static function fetchRequiredDataFromArray($array, $key)
	{
		if (!empty($array[$key]) && isset($array[$key]) && $array[$key] != '') {
			return $array[$key];
		} else {
			return self::responseWithException("Required input must not be empty. (`$key`).");
		}
	}

	public static function fetchDataFromArray($array, $key)
	{
		//return as null coalesce
		return $array[$key] ?? null; 
	}

}
