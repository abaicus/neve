<?php
/**
 * Shell control. Handles data passing from args to JS.
 */

namespace Neve\Customizer\Controls\React;

/**
 * Class Shell
 *
 * @package Neve\Customizer\Controls\React
 */
class Shell extends \WP_Customize_Control
{
	/**
	 * Additional arguments passed to JS.
	 *
	 * @var array
	 */
	public $input_attrs = [];

	/**
	 * Send to JS.
	 */
	public function to_json()
	{
		parent::to_json();
		$this->json['input_attrs'] = $this->input_attrs;
	}
}
