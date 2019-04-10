<?php
/**
 * @package Neve\Views
 */

namespace Neve\Views;

/**
 * Class Page_Layout
 *
 * @package Neve\Views
 */
class Page_Layout extends Base_View {

	/**
	 * Init function
	 */
	public function init() {
		add_action( 'neve_do_single_page', array( $this, 'render_page' ) );
	}

	/**
	 * Render single page.
	 */
	public function render_page() {
		do_action( 'neve_before_content', 'single-page' );
		echo '<div class="nv-content-wrap entry-content">';
		the_content();

		if ( comments_open() || get_comments_number() ) {
			comments_template();
		}

		echo '</div>';
		do_action( 'neve_do_pagination', 'single' );
		do_action( 'neve_after_content', 'single-page' );
	}

}