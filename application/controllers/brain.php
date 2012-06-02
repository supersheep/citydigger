<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Brain extends CI_Controller {

	public function index()
	{
		$this->load->helper('url');
		$this->load->library('session');
		$this->load->model('user');
		$this->load->model('mention');
		//$this->load->helper('cookie');
		$logged = $this->user->logged();
		$this->data['logged'] = $logged;
		$this->data['title'] = $this->config->item('sitename');
			
		if($logged){
		
			$current = $this->user->current();
			$msgcount = $this->mention->count($current->id);
			$this->data['msgcount'] = $msgcount;
			
			$this->data['username'] = $current->username;
			$this->data['userid'] = $current->id;
			$this->data['avatar'] = $current->avatar;
			
			$this->load->view('frag/header',$this->data);
			$this->load->view('pages/brain',$this->data);
			
		}else{
		
			$this->load->view('frag/header',$this->data);
			$this->load->view('pages/login',$this->data);
			
		}
		
		$this->load->view('frag/footer',$this->data);
	}
}
	