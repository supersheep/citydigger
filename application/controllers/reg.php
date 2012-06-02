<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Reg extends CI_Controller {

	/**
	 * Index Page for this controller.
	 *
	 * Maps to the following URL
	 * 		http://example.com/index.php/welcome
	 *	- or -  
	 * 		http://example.com/index.php/welcome/index
	 *	- or -
	 * Since this controller is set as the default controller in 
	 * config/routes.php, it's displayed at http://example.com/
	 *
	 * So any other public methods not prefixed with an underscore will
	 * map to /index.php/welcome/<method_name></method_name>
	 * @see http://codeigniter.com/user_guide/general/urls.html
	 */
	private $data;
	
	private $emailaddr;
	
	private $password;
	
	public function index()
	{
		$this->load->database();
		$this->load->helper('email');
		$this->load->library('email');
		
		
		$this->load->model('user');
		
		
		$this->data['title'] = $this->config->item('sitename')." - Sign up";
		$this->data['logged'] = $this->user->logged();
		
		
		
		$this->username = $this->input->post('username');
		$this->emailaddr = $this->input->post('email');
		$this->password = $this->input->post('password');
		$this->confirm = $this->input->post('confirm');
		
		$this->data['email'] = $this->emailaddr;
		$this->data['username'] = $this->username;
		
		$this->load->view('frag/header',$this->data);
		
		
		if(!$this->valid()){
			$this->load->view('pages/reg',$this->data);
		}else{	
			$this->user->create(array(
				'create_time'=> date("Y-m-d h:i:s"),
				'username'=>$this->username,
				'email'=>$this->emailaddr,
				'password'=>$this->password)
			);
			$this->load->view('pages/create_user');
		}
	}
		
	private function valid(){
		
		if(!$this->input->post()){
			return false;
		}
		
		// 邮箱未输入
		if(!$this->emailaddr){
			$this->data['error'] = 'plz enter your email';
			return false;
		}
		
		// 邮箱不合法
		if(!valid_email($this->emailaddr)){			
			$this->data['error'] = 'email format error';
			return false;
		}	
		
		// 邮箱已存在
		if($this->user->email_exists($this->emailaddr)){
			$this->data['error'] = 'this email is existing';
			return false;
		}
		
		
		// 用户名未输入
		if(!$this->username){
			$this->data['error'] = 'plz enter your nickname';
			return false;
		}
		
		
		// 用户名不合法
		if(!$this->username){
			$this->data['error'] = 'nickname should carry 3 characters at least';
			return false;
		}
		
		
		// 用户名已存在
		if($this->user->name_exists($this->username)){
			$this->data['error'] = 'the nick name is existing';
			return false;
		}
		
		
		// 密码未输入
		if(!$this->password){
			$this->data['error'] = 'please enter your password';
			return false;
		}
		
		// 密码不合法	
		if(strlen($this->password)<6){
			$this->data['error'] = 'password should carry 6 characters at least';
			return false;
		}
		
		// 密码确认错误
		if($this->password != $this->confirm){
			$this->data['error'] = 'confirm does not match the password';
			return false;
		}
		
		return true;
		
	}
}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */
